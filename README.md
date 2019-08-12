# CASH

## Demo 环境快速启动阅览

> 请确保你已经安装好了 docker 与 docker-compose

- clone 项目

```bash
$ git clone https://github.com/anshengme/cash.git
```

- 进入项目目录

```bash
$ cd cash
$ cp docker-compose.demo.yml docker-compose.yml
```

- 启动服务

```bash
$ docker-compose up -d
```

- 查看日志已确保 Django 启动

```bash
$ docker-compose logs -f # 类似出现api_1_CONTAINER_ID | python3 manage.py runserver 0:9006
```

- 导入默认数据

```bash
$ docker-compose exec cash sh -c "cd /src && make load"
```

- 创建管理用户

```bash
$ docker-compose exec cash sh -c "cd /src && python manage.py createsuperuser"
```

- 生成静态文件

```bash
$ docker-compose exec cash sh -c "cd /src && python manage.py collectstatic --noinput"
```

- 访问

首页：`http://localhost:9080/` / 管理后台：`http://localhost:9080/`
