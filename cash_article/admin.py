from django.contrib import admin

from .models import Article


# Register your models here.


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "title", "ct", "ut", "status", "type", "view_count", "release_time")
    list_display_links = ("id", 'title')
    list_filter = ('status', "type")
    search_fields = ("title", "url")
