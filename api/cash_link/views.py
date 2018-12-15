from rest_framework import viewsets, mixins
from rest_framework_extensions.cache.mixins import CacheResponseMixin

from .models import Link
from .serializers import LinkViewSetListSerializer


# Create your views here.

class LinkViewSet(CacheResponseMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    list:
    友情链接列表
    """
    queryset = Link.objects.filter(is_del=False)
    serializer_class = LinkViewSetListSerializer
