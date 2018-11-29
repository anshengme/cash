from django.db import models

from utils.models import BaseModel


# Create your models here.

class Link(BaseModel):
    """ 友情链接 """
    url = models.URLField(help_text="URL地址")
    name = models.CharField(max_length=12, help_text="名称")

    class Meta:
        db_table = "link"
