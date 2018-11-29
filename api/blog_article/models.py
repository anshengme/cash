from django.db import models

from blog import static


# Create your models here.

class Article(models.Model):
    """ 文章 """
    title = models.CharField(max_length=32, unique=True, help_text='文章标题')
    url = models.CharField(max_length=255, unique=True, help_text='链接')
    desc = models.TextField(help_text='摘要')
    content = models.TextField(help_text='文章内容')
    ct = models.DateTimeField(auto_now_add=True, help_text='创建时间')
    ut = models.DateTimeField(auto_now=True, help_text='修改时间')
    status = models.IntegerField(default=1, choices=static.ARTICLE_STATUS_CHOICES, help_text='文章状态')

    class Meta:
        db_table = "article"
