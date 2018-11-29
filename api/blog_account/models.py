from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.


class Account(AbstractUser):
    """ 用户 """
    nick_name = models.CharField(max_length=10, null=True, blank=True, help_text="昵称")
    ut = models.DateTimeField(auto_now=True, help_text='更新时间')
    avatar = models.CharField(max_length=64, default='default/avatar.png', help_text="头像")

    class Meta:
        db_table = "account"
