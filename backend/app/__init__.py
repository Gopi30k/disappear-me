from celery import Celery
import os
from dotenv import load_dotenv
load_dotenv()


def make_celery(app_name=__name__):
    backend = os.getenv("CELERY_BACKEND_URI")
    broker = os.getenv("CELERY_BROKER_URI")
    return Celery(app_name, backend=backend, broker=broker)


celery = make_celery()
