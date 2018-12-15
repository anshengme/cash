from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('settings', views.SettingsViewSet, base_name='settings')
router.register('image', views.ImageViewSet, base_name='image')
urlpatterns = []

urlpatterns += router.urls
