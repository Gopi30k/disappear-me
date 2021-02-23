from flask import Blueprint, json, request, jsonify
import os
from .tasks import timer_task
bp = Blueprint("all", __name__)


@bp.route("/submit", methods=['POST'])
def disappear():
    if request.method == 'POST':
        request_value = request.json
        # task = timer_task.apply_async(args=[request_value], task_id='GopiK')
        task = timer_task.delay(request_value)
        # url_path = request.url_root+"""{task_Id}""".format(task_Id=task.id)
    # return jsonify(url_path), 200
    return jsonify(task.id), 200


@bp.route('/<url_path>', methods=['GET'])
def checkDisappearingStatus(url_path):
    response_msg = None
    try:
        task = timer_task.AsyncResult(url_path)
        response_msg = {
            "task_id": task.id,
            "content": task.info.get('content', ""),
            "type": task.info.get('type', ""),
            "ttl": task.info.get('ttl', 0),
        }
    except Exception as e:
        return jsonify(msg="Error"), 400
    return jsonify(response_msg), 200
