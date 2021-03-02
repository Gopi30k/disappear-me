from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from .utils import init_celery
from flask_jwt_extended import JWTManager

PKG_NAME = os.path.dirname(os.path.realpath(__file__)).split("/")[-1]
db = SQLAlchemy()
jwt = JWTManager()


def create_app(app_name=PKG_NAME, **kwargs):
    app = Flask(app_name)
    CORS(app)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL_P")
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    db.init_app(app)
    jwt.init_app(app)
    if kwargs.get("celery"):
        init_celery(kwargs.get("celery"), app)
    from app.routes import bp
    app.register_blueprint(bp)
    return app
