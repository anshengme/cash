import multiprocessing

bind = '127.0.0.1:9006'
workers = multiprocessing.cpu_count()
loglevel = 'info'
pidfile = '/tmp/gunicorn.pid'
reload = True
