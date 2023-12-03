import os

class Config(object):
    SECRET_KEY = 'you-will-never-guess'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = './app/static/uploads'
    JWT_BLACKLIST_ENABLED = True
    JWT_ACCESS_TOKEN_EXPIRES = False
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = 'jaitexart@gmail.com'
    MAIL_PASSWORD = 'xdfbbderzwthwefz'

    MAIL_USE_TLS = 1
   
    ADMINS = 'jaitexart@gmail.com'
    MSG91_KEY = '370985AgDkftD561c2b192P1'

    # SPACES
    SPACES_KEY = 'GOGF3VQXYSKM42T5H727'
    SPACES_SECRET = '47sOjmoDYWYUmk7PwkwvHYINeDWYYZEXzMVnFeWxOS0'
    SPACES_NAME = 'saas-space'
    SPACES_SUBFOLDER = 'pim'
    
    SPACES_ENDPOINT = ''
    # SPACES_ENDPOINT = 'ams3'
    SPACES_REGION = 'ams3'
    
    # MANAGED DB

    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:alpine@127.0.0.1/metakeep'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://doadmin:pmo0ehm008te5xna@saas-db-do-user-6084606-0.b.db.ondigitalocean.com:25060/panya'
    
    ELASTICSEARCH_URL = "http://localhost:9200"
