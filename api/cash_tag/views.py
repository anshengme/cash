from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework_extensions.cache.mixins import CacheResponseMixin

from .models import Tag
from .serializers import TagViewSetListSerializer, TagViewSetRetrieveSerializer


# Create your views here.

class TagViewSet(CacheResponseMixin,
                 mixins.ListModelMixin,
                 mixins.RetrieveModelMixin,
                 viewsets.GenericViewSet):
    """
    list:
    标签链接列表
    """
    lookup_field = 'name__iexact'
    queryset = Tag.objects.filter(is_del=False)
    serializer_class = TagViewSetListSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return TagViewSetListSerializer
        return TagViewSetRetrieveSerializer

    def retrieve(self, request, *args, **kwargs):
        """
        标签-关联文章列表
        """
        instance = self.get_object()
        articles = instance.article_set.filter(is_del=False, type=1, status=1).order_by("-release_time")
        serializer = self.get_serializer(articles, many=True)
        return Response(serializer.data)
