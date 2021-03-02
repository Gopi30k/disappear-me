from .models import Task, TaskExtended, User, TaskSet
from .factory import db
from flask import Blueprint, json, request, jsonify
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
import os
import ast
import time
import bcrypt
import shortuuid
import json
from .tasks import timer_task
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
bp = Blueprint("all", __name__)


class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        include_relationships = True
        load_instance = True


@bp.route("/", methods=['GET'])
def index():
    return "Hey welcome", 200


@bp.route("/login", methods=['POST'])
def login():
    if request.method == "POST" and (request.is_json):
        login_request = request.json
        user = User.query.filter_by(email=login_request['email']).first()
        if not(user):
            return jsonify({'msg': 'Invalid Email Address'}), 404
        elif not(bcrypt.checkpw(login_request['password'].encode('utf-8'),  user.password_hash.encode('utf-8'))):
            return jsonify({'error': 'Invalid Password'}), 404
        access_token = create_access_token(
            identity=str(user.id), expires_delta=False)
        return jsonify(user=user.id, token=access_token), 200
    else:
        return jsonify(msg="Invalid request"), 400


@ bp.route("/signup", methods=['POST'])
def signup():
    if request.method == "POST" and (request.is_json):
        signup_request = request.json
        user = User.query.filter_by(email=signup_request['email']).first()
        if user is not None:
            return jsonify(msg="EmailId already exists"), 400
        user_id = shortuuid.uuid()
        new_user = User(id=user_id, first_name=signup_request['firstName'], last_name=signup_request['lastName'], email=signup_request['email'],
                        password_hash=signup_request['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(msg="Signup successfull"), 200
    else:
        return jsonify(msg="Invalid request"), 400


@bp.route("/user/<user_id>", methods=['GET'])
@jwt_required()
def userDashboardView(user_id):
    user_id_jwt = get_jwt_identity()
    if str(user_id) == str(user_id_jwt):
        tasks = Task.query.filter_by(user_id=user_id_jwt).all()
        tasks_result = TaskSchema(many=True).dump(tasks)
        for task in tasks_result:
            task['result'] = ast.literal_eval(task['result'])
        return jsonify(tasks_result), 200
    else:
        return jsonify(msg="Invalid User"), 400


@ bp.route("/submit", methods=['POST'])
def disappear():
    if request.method == 'POST':
        request_value = request.json
        task = timer_task.delay(request_value)
        if 'user' in request_value.keys() and request_value['user'] is not None:
            periodic_check = 8
            while periodic_check > 0:
                if task.state == 'PROGRESS':
                    break
                time.sleep(1)
                periodic_check -= 1
            else:
                return jsonify(msg="Can't generate message, Please try again later"), 500
            # updating user id in Celery Task
            Task.query.filter_by(task_id=task.id).update(
                dict(user_id=request_value['user']))
            db.session.commit()
        # task = timer_task.apply_async(args=[request_value], task_id='GopiK')

        # url_path = request.url_root+"""{task_Id}""".format(task_Id=task.id)
    # return jsonify(url_path), 200
    return jsonify(task.id), 200


@ bp.route("/retry", methods=['POST'])
@jwt_required()
def retryTask():
    if request.method == 'POST':
        retry_value = request.json
        print(retry_value)
        retry_task = timer_task.apply_async(
            args=[retry_value['input']], task_id=retry_value['task_id'])
    return jsonify(msg="Retry triggered"), 200


@ bp.route("/delete/<task_id>", methods=['DELETE'])
@jwt_required()
def deleteTask(task_id):
    Task.query.filter_by(task_id=task_id).delete()
    db.session.commit()
    return jsonify(msg="Deleted Successfully"), 200


@ bp.route('/<url_path>', methods=['GET'])
def checkDisappearingStatus(url_path):
    response_msg = None
    try:
        task = timer_task.AsyncResult(url_path)
        if task.state == 'PROGRESS':
            print(task.info)
            response_msg = {
                "task_id": task.id,
                "active": True,
                "content": task.info.get('content', ""),
                "type": task.info.get('type', ""),
                "ttl": task.info.get('ttl', 0),
                "time": task.info.get('time', 0)
            }
        elif task.state == 'SUCCESS':
            response_msg = {
                "task_id": task.id,
                "content": task.info.get('content', ""),
                "type": task.info.get('type', ""),
                "ttl": task.info.get('ttl', 0),
                "active": False
            }
    except Exception as e:
        return jsonify(msg="Error while creating disappearing content, Please try again later"), 500
    return jsonify(response_msg), 200
