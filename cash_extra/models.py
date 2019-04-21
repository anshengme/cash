from django.db import models

from utils.models import BaseModel


# Create your models here.

class Config(BaseModel):
    key = models.CharField(max_length=32, unique=True, verbose_name="Key")
    value = models.CharField(max_length=128, null=True, blank=True, verbose_name="Value")
    desc = models.CharField(max_length=64, null=True, blank=True, verbose_name="描述")

    class Meta:
        db_table = "config"
        verbose_name = '配置'
        verbose_name_plural = verbose_name


class Image(BaseModel):
    img = models.ImageField(upload_to='images/%Y/%m/%d', max_length=200, verbose_name="图片")
    desc = models.CharField(max_length=32, null=True, blank=True, verbose_name="描述")

    class Meta:
        db_table = "image"
        verbose_name = '图片'
        verbose_name_plural = verbose_name
