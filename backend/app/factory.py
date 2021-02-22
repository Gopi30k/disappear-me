from flask import Flask
from flask_cors import CORS
import os
from .utils import init_celery

PKG_NAME = os.path.dirname(os.path.realpath(__file__)).split("/")[-1]
print(PKG_NAME)


def create_app(app_name=PKG_NAME, **kwargs):
    app = Flask(app_name)
    CORS(app)
    if kwargs.get("celery"):
        init_celery(kwargs.get("celery"), app)
    from app.routes import bp
    app.register_blueprint(bp)
    return app
