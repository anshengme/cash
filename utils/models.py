from django.db import models


class BaseModel(models.Model):
    """ 模型基类 """
    ct = models.DateTimeField(auto_now_add=True, help_text="创建时间", verbose_name="创建时间")
    ut = models.DateTimeField(auto_now=True, help_text='更新时间', verbose_name="更新时间")

    class Meta:
        abstract = True
