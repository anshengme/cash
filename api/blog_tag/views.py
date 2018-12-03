from rest_framework import viewsets, mixins

from .models import Tag
from .serializers import TagViewSetListSerializer


# Create your views here.

class LinkViewSet(mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
    list:
    标签链接列表
    """
    queryset = Tag.objects.filter(is_del=False)
    serializer_class = TagViewSetListSerializer
