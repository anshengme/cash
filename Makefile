start:
	docker-compose start


stop:
	docker-compose stop


up:
	docker-compose up -d


down:
	docker-compose down


logs:
	docker-compose logs -f


migrate:
	docker-compose exec api sh -c "cd /src && make migrate"


load:
	docker-compose exec api sh -c "cd /src && make load"
