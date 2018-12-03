from rest_framework import viewsets, mixins
from rest_framework.response import Response

from blog_extra.models import Setting
from blog_link.models import Link
from blog_tag.models import Tag
from utils.pagination import LimitPagePagination
from .permissions import IsSuperuserPermission
from .serializers import LinkViewSetListSerializer, LinkViewSetCreateSerializer, LinkViewSetUpdateSerializer, \
    LinkViewSetRetrieveSerializer, TagViewSetListSerializer, TagViewSetCreateSerializer, TagViewSetRetrieveSerializer, \
    TagViewSetUpdateSerializer, SettingViewSetListSerializer, SettingViewSetUpdateSerializer


# Create your views here.

class LinkViewSet(viewsets.ModelViewSet):
    """
    list:
    友情链接-列表

    create:
    友情链接-创建

    update:
    友情链接-更新

    retrieve:
    友情链接-详情

    destroy:
    友情链接-删除
    """
    queryset = Link.objects.all()
    permission_classes = (IsSuperuserPermission,)
    pagination_class = LimitPagePagination

    def get_serializer_class(self):
        if self.action == 'list':
            return LinkViewSetListSerializer
        elif self.action == 'create':
            return LinkViewSetCreateSerializer
        elif self.action == 'update':
            return LinkViewSetUpdateSerializer
        return LinkViewSetRetrieveSerializer


class TagViewSet(viewsets.ModelViewSet):
    """
    list:
    标签-列表

    create:
    标签-创建

    update:
    标签-更新

    retrieve:
    标签-详情

    destroy:
    标签-删除
    """
    queryset = Tag.objects.order_by("-id")
    permission_classes = (IsSuperuserPermission,)
    pagination_class = LimitPagePagination

    def get_serializer_class(self):
        if self.action == 'list':
            return TagViewSetListSerializer
        elif self.action == 'create':
            return TagViewSetCreateSerializer
        elif self.action == 'update':
            return TagViewSetUpdateSerializer
        return TagViewSetRetrieveSerializer


class SettingViewSet(mixins.ListModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    update:
    站点设置-更新
    """
    queryset = Setting.objects.all()
    permission_classes = (IsSuperuserPermission,)

    def get_serializer_class(self):
        if self.action == "list":
            return SettingViewSetListSerializer
        return SettingViewSetUpdateSerializer

    def list(self, request, *args, **kwargs):
        """
        站点设置
        """
        return Response(self.get_serializer(self.get_queryset().last()).data)
