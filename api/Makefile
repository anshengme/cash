APP_LIST=blog_account blog_article blog_link blog_admin

.PHONY: all clean migrate start reload load


all:
	@echo [clean] up migrations and database file
	@echo [migrate] database
	@echo [start] server


clean:
	rm -rf */migrations db.sqlite3


migrate:
	python3 manage.py makemigrations $(APP_LIST)
	python3 manage.py migrate


start:
	python3 manage.py runserver 0:9006


reload:
	rm -rf */migrations
	python3 manage.py makemigrations $(APP_LIST)
	python3 manage.py migrate
	python3 manage.py loaddata fixtures/*.yaml


load:
	python3 manage.py loaddata fixtures/*.yaml

