from django.contrib import admin

from .models import Config, Image

admin.site.site_header = 'CASH'
admin.site.site_title = 'CASH'


# Register your models here.


@admin.register(Config)
class ConfigAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "ct", "ut", "key", "value", "desc")


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "ct", "ut", "img", "desc")
