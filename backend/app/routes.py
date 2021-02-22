from flask import Blueprint, json, request, jsonify
import os
from .tasks import timer_task
bp = Blueprint("all", __name__)


@bp.route("/submit", methods=['POST'])
def disappear():
    if request.method == 'POST':
        request_value = request.json
        task = timer_task.delay(request_value)
        url_path = request.url_root+"""{task_Id}""".format(task_Id=task.id)
    return jsonify(url_path)


@bp.route('/<url_path>', methods=['GET'])
def checkDisappearingStatus(url_path):
    print(url_path)
    task = timer_task.AsyncResult(url_path)
    response_msg = {
        "task_id": task.id,
        "ttl": task.info.get('ttl', 0),
    }
    return jsonify(response_msg)
