from django.contrib.admin import ModelAdmin, register
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from core.models import User, IPAddress

# Register your models here.
@register(User)
class UserAdmin(BaseUserAdmin):
    readonly_fields = ('id',)

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'id',
                    'username',
                    'password'
                )
            }
        ),
        (
            _('Personal info'),
            {
                'fields': (
                    'first_name',
                    'last_name',
                    'email'
                )
            }
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions'
                ),
            },
        ),
        (
            _('Important dates'),
            {
                'fields': (
                    'last_login',
                    'date_joined'
                )
            }
        )
    )


@register(IPAddress)
class IPAddressAdmin(ModelAdmin):
    readonly_fields = ('ip_address', 'date_added', 'last_request')
    list_display = ('ip_address', 'date_added', 'last_request')
    search_fields = ('ip_address',)
    ordering = ('last_request', 'date_added')

    fieldsets = (
        (
            None,
            {
                'fields': (
                    'ip_address',
                )
            }
        ),
        (
            _('Information'),
            {
                'fields': (
                    'date_added',
                    'last_request'
                )
            }
        )
    )
