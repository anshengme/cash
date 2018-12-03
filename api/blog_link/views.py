from rest_framework import viewsets, mixins

from .models import Link
from .serializers import LinkViewSetListSerializer


# Create your views here.

class LinkViewSet(mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    list:
    友情链接列表
    """
    queryset = Link.objects.filter(is_del=False)
    serializer_class = LinkViewSetListSerializer
