from django.db import models

from utils.models import BaseModel


# Create your models here.

class Link(BaseModel):
    """ 友情链接 """
    name = models.CharField(max_length=32, help_text="名称")
    url = models.CharField(max_length=32, help_text="URL地址")

    class Meta:
        db_table = "link"
