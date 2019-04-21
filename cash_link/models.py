from django.db import models

from utils.models import BaseModel


# Create your models here.

class Link(BaseModel):
    """ 友情链接 """
    name = models.CharField(max_length=32, verbose_name="名称")
    url = models.URLField(max_length=64, verbose_name="URL地址")

    def __str__(self):
        return self.name

    class Meta:
        db_table = "link"
        verbose_name = '友情链接'
        verbose_name_plural = verbose_name
