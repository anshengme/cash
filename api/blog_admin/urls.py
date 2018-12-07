from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('link', views.LinkViewSet, base_name='link')
router.register('tag', views.TagViewSet, base_name='tag')
router.register('setting', views.SettingViewSet, base_name='setting')
router.register('account', views.AccountViewSet, base_name='account')
urlpatterns = []

urlpatterns += router.urls
