from django.db import models

from cash import static
from cash_tag.models import Tag
from utils.models import BaseModel


# Create your models here.

class Article(BaseModel):
    title = models.CharField(max_length=64, unique=True, verbose_name='文章标题')
    url = models.CharField(max_length=255, unique=True, verbose_name='链接')
    description = models.TextField(null=True, blank=True, verbose_name='摘要')
    keywords = models.TextField(verbose_name='关键字')
    content = models.TextField(verbose_name='文章内容')
    img = models.CharField(max_length=64, null=True, blank=True, verbose_name="文章封面图")
    status = models.IntegerField(default=1, choices=static.ARTICLE_STATUS_CHOICES, verbose_name='文章状态')
    type = models.IntegerField(default=1, choices=static.ARTICLE_TYPE_CHOICES, verbose_name='文章类型')
    view_count = models.IntegerField(default=0, verbose_name="查看数")
    release_time = models.DateTimeField(null=True, blank=True, verbose_name="发布时间")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="标签")

    def __str__(self):
        return self.title

    class Meta:
        db_table = "article"
        verbose_name = '文章'
        verbose_name_plural = verbose_name
