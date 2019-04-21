from django.contrib import admin

from .models import Account


# Register your models here.


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_per_page = 10
    list_display = ("id", "email", "is_active", "date_joined", "last_login", "nick_name")
    list_display_links = ("id", 'email')
    list_filter = ('is_active',)
    search_fields = ("email", "nick_name")
    fields = ("email", "nick_name", "is_active", "date_joined", "last_login",)
