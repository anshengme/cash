from django.contrib import admin

from .models import Article


# Register your models here.


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "title", "ct", "ut", "status", "type", "is_top", "view_count", "ct")
    list_display_links = ("id", 'title')
    list_filter = ('status', "type", "is_top")
    search_fields = ("title", "url")
    readonly_fields = ("view_count",)
