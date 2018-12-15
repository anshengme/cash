from django.db import models


# Create your models here.

class Settings(models.Model):
    key = models.CharField(max_length=32, unique=True, help_text="Key")
    value = models.CharField(max_length=128, null=True, blank=True, help_text="Value")
    desc = models.CharField(max_length=64, null=True, blank=True, help_text="描述")

    class Meta:
        db_table = "settings"
