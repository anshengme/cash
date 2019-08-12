import os
import multiprocessing

BIND_HOST = os.environ.get('BIND_HOST', '127.0.0.1')

bind = f'{BIND_HOST}:9006'
workers = multiprocessing.cpu_count()
loglevel = 'info'
pidfile = '/tmp/gunicorn.pid'
reload = True
