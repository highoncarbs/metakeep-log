from flask import request, jsonify, current_app
from app.basic_master import bp
from app.basic_master.logs.model import Logs, LogsSchema
from app import db, ma
import os
from sqlalchemy import exc
from datetime import datetime , timedelta
import dateutil.parser as dt

schema  = LogsSchema()
schema_many  = LogsSchema(many=True)

@bp.route('/hello_world',methods = ['POST', 'GET'])
def hello_world():
    # Check for POST

    try:
        if request.method == 'POST':    
            request_data = str(request.json)
            user_id = int(request.json.get('user_id'))
            if not user_id:
                log_entry = Logs(user_id=None)
                response_data = "user_id not provided",500 
                log_entry.req_obj = request_data
                log_entry.res_obj = response_data
                log_entry.user_id = None
                log_entry.error_mssg = "!! user_id is not provided. Please provid a valid user_id."
                log_entry.timestamp = str(datetime.today())
                log_entry.status = 500

                db.session.add(log_entry)
                db.session.commit()
                return response_data
                

            log_entry = Logs(user_id=user_id)
            response_data = "Hello world",200 
            log_entry.req_obj = request_data
            log_entry.res_obj = response_data
            log_entry.user_id = user_id
            log_entry.timestamp = str(datetime.today())
            log_entry.status = 200

            db.session.add(log_entry)
            db.session.commit()


            return response_data
        else:
            log_entry = Logs(user_id=None)
            response_data = "GET Method not allowed",405 
            log_entry.req_obj = ""
            log_entry.res_obj = response_data
            log_entry.user_id = None
            log_entry.timestamp = str(datetime.today())
            log_entry.status = 405

            db.session.add(log_entry)
            db.session.commit()
            return response_data

    except Exception as e:
        current_app.logger.error("Unable to fetch data")
        log_entry = Logs(user_id = None)
        log_entry.user_id = None
        log_entry.timestamp = str(datetime.today())
        log_entry.status = 500
        log_entry.error_mssg = str(e)

        db.session.add(log_entry)
        db.session.commit()
        return jsonify({'message': 'Unable to fetch data.','log':str(e)})

# @bp.route('/logs/get/all', methods=['GET'])
# def get_category_Type():
#     try:
#         data = Logs.query.order_by(Logs.timestamp).all()
#         json_data = schema_many.dump(data)
#         return jsonify(json_data)
#     except Exception as e:
#         current_app.logger.error("%s - Unable to fetch data - %s",'user')
#         return jsonify({'message': 'Unable to fetch data.','log':str(e)})

@bp.route('/logs/get', methods=['GET'])
def get_logs():
    try:
        page = request.args.get('page', 1, type=int)
        show = request.args.get('show', 20, type=int)
        time = request.args.get('time', "24hrs", type=str)
        results = Logs.query.order_by(Logs.timestamp)

        if( time == "24hrs"):
            start_time =datetime.now()
            end_time =datetime.now() - timedelta(hours=24)
            # print(start_time, end_time)
            results = results.filter( Logs.timestamp >= end_time).filter(Logs.timestamp <= start_time)
        if( time == "7days"):
            start_time =datetime.now()
            end_time =datetime.now() - timedelta(days=7)
            # print(start_time, end_time)
            results = results.filter( Logs.timestamp >= end_time).filter(Logs.timestamp <= start_time)
        if( time == 'custom'):
            time_range = request.args.getlist('custom_time[]')
            
            start_time =dt.parse(time_range[0]) + timedelta(hours=6)
            end_time =dt.parse(time_range[1])+ timedelta(hours=6)
            # print(start_time, end_time)
            results = results.filter( Logs.timestamp <= end_time).filter(Logs.timestamp >= start_time)
        
        # results = results.paginate( page=page, per_page=show, error_out=False)
        results = results.all()
        # total = results.total
        json_data = schema_many.dump(results)
        no_of_failed =  len(list(filter(lambda x: x.status != '200', results)))
        uq_users = set()
        unique = [x for x in results if x.user_id not in uq_users and (uq_users.add(x.user_id) or True)]

        # Unique
        #  Users - done
        #  No. of failed requests - done
        #  No. of success requests 
        #  No. of calls

        meta_data = {
            'failed': no_of_failed,
            'uq_users': len(list(uq_users)),
            'total_calls': len(results),
        }
        return jsonify({'data': json_data, 'meta': meta_data })
    except Exception as e:
        print(str(e))
        # current_app.logger.error("%s - Unable to fetch data ",'user')
        return jsonify({'message': 'Unable to fetch data.','log':str(e)})

