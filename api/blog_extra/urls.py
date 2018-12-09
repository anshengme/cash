from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('settings', views.SettingsViewSet, base_name='settings')
urlpatterns = []

urlpatterns += router.urls
