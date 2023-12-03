from app import db, ma
from flask import Blueprint, request, jsonify
from app import current_app

import os
bp = Blueprint('basic_master', __name__)


from app.basic_master.logs.model import Logs
from app.basic_master.logs import routes

from datetime import datetime, timedelta

UPLOAD_FOLDER = os.path.abspath(current_app.config['UPLOAD_FOLDER'])

