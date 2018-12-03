from django.db import models

from utils.models import BaseModel


# Create your models here.

class Tag(BaseModel):
    name = models.CharField(max_length=12, help_text="标签名称")

    @property
    def article_count(self):
        return self.article_set.filter(status=1, type=1).count()

    class Meta:
        db_table = "tag"
