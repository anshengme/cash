APP_LIST=cash_article cash_link cash_tag cash_extra


clean:
	rm -rf */migrations db.sqlite3


migrate:
	python3 manage.py makemigrations $(APP_LIST)
	python3 manage.py migrate


start:
	python3 manage.py runserver 0:9006


load:
	python3 manage.py loaddata fixtures/*.yaml


deploy:
	gunicorn -c cash/gunicorn.conf.py cash.wsgi

