from enum import unique
import sqlalchemy as sa
from sqlalchemy.types import PickleType
from .factory import db
from datetime import datetime
from celery import states
from celery.backends.database.models import Task
import bcrypt
# from celery.backends.database.session import db.Model


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.String(120), primary_key=True)
    # user_id = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(64), index=True, nullable=False)
    last_name = db.Column(db.String(64), index=True, nullable=True)
    email = db.Column(db.String(120), index=True, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)
    tasks = db.relationship('Task', backref='user', lazy='dynamic')

    def __init__(self, id, first_name, last_name, email, password_hash):
        self.id = id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        pwd_hash = bcrypt.hashpw(
            password_hash.encode('utf-8'), bcrypt.gensalt())
        self.password_hash = pwd_hash.decode('utf-8')

    def __repr__(self):
        return '<User {0.id} -> {0.first_name}>'.format(self)


# class ContentTasks(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     content_task_id = db.Column(db.String(155), unique=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(
#         'user.id'), nullable=True)

class Task(db.Model):
    """Task result/status."""

    __tablename__ = 'celery_taskmeta'
    __table_args__ = {'sqlite_autoincrement': True, 'extend_existing': True}

    id = db.Column(db.Integer, db.Sequence('task_id_sequence'),
                   primary_key=True, autoincrement=True)
    task_id = db.Column(db.String(155), unique=True)
    status = db.Column(db.String(50), default=states.PENDING)
    result = db.Column(PickleType, nullable=True)
    date_done = db.Column(db.DateTime, default=datetime.utcnow,
                          onupdate=datetime.utcnow, nullable=True)
    traceback = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.String(120), db.ForeignKey(
        'user.id'), nullable=True)

    def __init__(self, task_id):
        self.task_id = task_id

    def to_dict(self):
        return {
            'task_id': self.task_id,
            'status': self.status,
            'result': self.result,
            'traceback': self.traceback,
            'date_done': self.date_done,
        }

    def __repr__(self):
        return '<Task {0.task_id} state: {0.status}>'.format(self)

    @classmethod
    def configure(cls, schema=None, name=None):
        cls.__table__.schema = schema
        cls.id.default.schema = schema
        cls.__table__.name = name or cls.__tablename__


class TaskExtended(Task):
    """For the extend result."""

    __tablename__ = 'celery_taskmeta'
    __table_args__ = {'sqlite_autoincrement': True, 'extend_existing': True}

    name = db.Column(db.String(155), nullable=True)
    args = db.Column(db.LargeBinary, nullable=True)
    kwargs = db.Column(db.LargeBinary, nullable=True)
    worker = db.Column(db.String(155), nullable=True)
    retries = db.Column(db.Integer, nullable=True)
    queue = db.Column(db.String(155), nullable=True)

    def to_dict(self):
        task_dict = super().to_dict()
        task_dict.update({
            'name': self.name,
            'args': self.args,
            'kwargs': self.kwargs,
            'worker': self.worker,
            'retries': self.retries,
            'queue': self.queue,
        })
        return task_dict


class TaskSet(db.Model):
    """TaskSet result."""

    __tablename__ = 'celery_tasksetmeta'
    __table_args__ = {'sqlite_autoincrement': True, 'extend_existing': True}

    id = db.Column(db.Integer, db.Sequence('taskset_id_sequence'),
                   autoincrement=True, primary_key=True)
    taskset_id = db.Column(db.String(155), unique=True)
    result = db.Column(PickleType, nullable=True)
    date_done = db.Column(db.DateTime, default=datetime.utcnow,
                          nullable=True)

    def __init__(self, taskset_id, result):
        self.taskset_id = taskset_id
        self.result = result

    def to_dict(self):
        return {
            'taskset_id': self.taskset_id,
            'result': self.result,
            'date_done': self.date_done,
        }

    def __repr__(self):
        return f'<TaskSet: {self.taskset_id}>'

    @classmethod
    def configure(cls, schema=None, name=None):
        cls.__table__.schema = schema
        cls.id.default.schema = schema
        cls.__table__.name = name or cls.__tablename__
