from django.db import models

from utils.models import BaseModel


# Create your models here.

class Setting(BaseModel):
    title = models.TextField(help_text="标题")
    keywords = models.TextField(help_text="关键字")
    description = models.TextField(help_text="描述")
    avatar = models.CharField(max_length=64, default='default/avatar.png', help_text="头像")

    class Meta:
        db_table = "setting"
