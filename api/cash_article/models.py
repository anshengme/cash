from django.db import models

from cash import static
from cash_tag.models import Tag
from utils.models import BaseModel


# Create your models here.

class Article(BaseModel):
    """ 文章 """
    title = models.CharField(max_length=64, unique=True, help_text='文章标题')
    url = models.CharField(max_length=255, unique=True, help_text='链接')
    description = models.TextField(null=True, blank=True, help_text='摘要')
    keywords = models.TextField(help_text='关键字')
    content = models.TextField(help_text='文章内容')
    img = models.CharField(max_length=64, null=True, blank=True, help_text="文章封面图")
    status = models.IntegerField(default=1, choices=static.ARTICLE_STATUS_CHOICES, help_text='文章状态')
    type = models.IntegerField(default=1, choices=static.ARTICLE_TYPE_CHOICES, help_text='文章类型')
    view_count = models.IntegerField(default=0, help_text="查看数")
    release_time = models.DateTimeField(null=True, blank=True, help_text="发布时间")
    tags = models.ManyToManyField(Tag, help_text="标签")

    @property
    def comment_count(self):
        """ 评论数量 """
        return self.comment_set.filter(reply__isnull=True).count()

    class Meta:
        db_table = "article"
