import sqlalchemy as sa
from celery.backends.database.models import Task


class DisappearingTasksModel(Task):
    __tablename__ = 'celery_taskmeta'
    __table_args__ = {'extend_existing': True}

    user_id = sa.Column(sa.String(155), nullable=True)
