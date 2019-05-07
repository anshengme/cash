# CASH

## Demo环境快速启动阅览

> 请确保你已经安装好了docker与docker-compose

- clone项目

```bash
$ git clone https://github.com/anshengme/cash.git
```

- 进入项目目录

```bash
$ cd cash
```

- 启动服务

```bash
$ make up
```

- 查看日志已确保Django启动

```bash
$ make logs  # 类似出现api_1_CONTAINER_ID | python3 manage.py runserver 0:9006
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