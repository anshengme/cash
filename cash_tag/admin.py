from django.contrib import admin

from .models import Tag


# Register your models here.


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "ct", "ut", "name", 'article_count')
    search_fields = ("name",)
