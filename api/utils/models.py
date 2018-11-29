from django.db import models


class BaseModel(models.Model):
    """ 模型基类 """
    ct = models.DateTimeField(auto_now_add=True, help_text="创建时间")
    ut = models.DateTimeField(auto_now=True, help_text='更新时间')
    is_del = models.BooleanField(default=False, help_text='是否删除')

    class Meta:
        abstract = True
