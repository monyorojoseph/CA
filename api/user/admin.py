from django.contrib import admin
from django.contrib.auth.models import Group
from .models import CustomUser

admin.site.unregister(Group)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'full_name', 'is_admin']