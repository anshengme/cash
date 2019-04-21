from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class Account(AbstractUser):
    nick_name = models.CharField(max_length=10, null=True, blank=True, verbose_name="昵称")
    ut = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    avatar = models.CharField(max_length=64, default='default/avatar.png', verbose_name="头像")

    class Meta:
        db_table = "account"
        verbose_name = '用户'
        verbose_name_plural = verbose_name
