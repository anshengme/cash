from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('hot', views.HotArticleViewSet, base_name='hot-article')
router.register('series', views.SeriesArticleViewSet, base_name='series-series')
router.register('archive', views.ArchiveViewSet, base_name='archive')
router.register('', views.ArticleViewSet, base_name='article')
urlpatterns = []

urlpatterns += router.urls
