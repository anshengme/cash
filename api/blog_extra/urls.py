from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('setting', views.SettingViewSet, base_name='setting')
urlpatterns = []

urlpatterns += router.urls
