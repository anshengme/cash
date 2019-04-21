from django.db import models

from utils.models import BaseModel


# Create your models here.

class Tag(BaseModel):
    name = models.CharField(max_length=12, verbose_name="名称")

    @property
    def article_count(self):
        return self.article_set.filter(status=1, type=1).count()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "tag"
        verbose_name = '标签'
        verbose_name_plural = verbose_name
