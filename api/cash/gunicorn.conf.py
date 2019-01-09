import multiprocessing
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TMP_DIR = os.path.join(BASE_DIR, 'tmp')

bind = '127.0.0.1:9006'
workers = multiprocessing.cpu_count() * 2 + 1
accesslog = os.path.join(TMP_DIR, 'logs/gunicorn.access.log')
errorlog = os.path.join(TMP_DIR, 'logs/gunicorn.error.log')
loglevel = 'info'
pidfile = os.path.join(TMP_DIR, 'gunicorn.pid')
reload = True
