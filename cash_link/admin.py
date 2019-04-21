from django.contrib import admin

from .models import Link


# Register your models here.


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "ct", "ut", "name", 'url')
    search_fields = ("name", "url")
