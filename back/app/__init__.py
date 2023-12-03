import logging
import os
from flask import Flask, request, current_app
from flask_sqlalchemy import SQLAlchemy


from config import Config
from werkzeug.debug import DebuggedApplication

from flask_marshmallow import Marshmallow
from flask_cors import CORS

# from flask_mail import Mail

# from elasticsearch import Elasticsearch

# import sentry_sdk
# from sentry_sdk.integrations.flask import FlaskIntegration

db = SQLAlchemy()
ma = Marshmallow()
# mail = Mail()
# es = Elasticsearch()


# moment = Moment()


# jwt = JWTManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    # app.es = Elasticsearch([app.config['ELASTICSEARCH_URL']]) \
    #     if app.config['ELASTICSEARCH_URL'] else None

  
    ma.init_app(app)
  
    CORS(app)

    # sentry_sdk.init(
    #     "https://0f50dc54af28460185eaffacebc22b46@o304658.ingest.sentry.io/5443159",
    #     traces_sample_rate=1.0
    # )

    with app.app_context():
   
        from app.basic_master import bp as basic_master_bp
        app.register_blueprint(basic_master_bp, url_prefix='/')
       
        db.create_all()

    return app
