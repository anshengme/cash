from .base import *

DEBUG = False

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', SECRET_KEY)
