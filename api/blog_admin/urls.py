from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('link', views.LinkViewSet, base_name='link')
router.register('tag', views.TagViewSet, base_name='tag')
router.register('account', views.AccountViewSet, base_name='account')
router.register('article', views.ArticleViewSet, base_name='article')
router.register('settings', views.SettingsViewSet, base_name='settings')
urlpatterns = []

urlpatterns += router.urls
