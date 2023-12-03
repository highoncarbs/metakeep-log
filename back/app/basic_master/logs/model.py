from app import db , ma
from datetime import datetime
import json

class TimestampMixin(object):
    created = db.Column(
        db.DateTime,  default=datetime.utcnow)
    updated = db.Column(db.DateTime)

class Logs(db.Model , TimestampMixin):
    __searchable__ = ['user_id']
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(30))
    timestamp = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(30), nullable=False)
    error_mssg = db.Column(db.JSON)
    req_obj = db.Column(db.JSON)
    res_obj = db.Column(db.JSON)

    def __init__(self, user_id):
        self.user_id = user_id


class LogsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Logs

        # load_instance=True

