from rest_framework import viewsets, mixins

from utils.pagination import LimitPagePagination
from .models import Article
from .serializers import HotArticleViewSetListSerializer, SeriesArticleViewSetListSerializer, ArticleViewSetListSerializer


# Create your views here.

class ArticleViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    """
    list:
    文章列表
    """
    queryset = Article.objects.filter(is_del=False, type=1, status=1).order_by("-release_time")
    serializer_class = ArticleViewSetListSerializer
    pagination_class = LimitPagePagination


class HotArticleViewSet(mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    """
    list:
    热门文章列表
    """
    queryset = Article.objects.filter(is_del=False, type=1, status=1).order_by("-view_count")[:5]
    serializer_class = HotArticleViewSetListSerializer


class SeriesArticleViewSet(mixins.ListModelMixin,
                           viewsets.GenericViewSet):
    """
    list:
    系列文章
    """
    queryset = Article.objects.filter(is_del=False, type=2, status=1)
    serializer_class = SeriesArticleViewSetListSerializer
