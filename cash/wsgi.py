import os

from django.core.wsgi import get_wsgi_application

profile = os.environ.get('CASH_PROFILE', 'develop')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cash.settings.%s" % profile)

application = get_wsgi_application()
