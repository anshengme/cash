from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from . import views

router = DefaultRouter()
router.register('hot', views.HotArticleViewSet, base_name='hot-article')
router.register('topic', views.TopicArticleViewSet, base_name='topic-article')
router.register('archive', views.ArchiveViewSet, base_name='archive')
router.register('', views.ArticleViewSet, base_name='article')

article_router = NestedDefaultRouter(router, '', lookup='article')
article_router.register(r'comment', views.ArticleCommentViewSet, base_name='article-comment')

urlpatterns = []

urlpatterns += router.urls + article_router.urls
