from django.db import models


class BaseModel(models.Model):
    """ 模型基类 """
    ct = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    ut = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        abstract = True
