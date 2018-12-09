from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework import viewsets, mixins
from rest_framework.response import Response

from blog_account.models import Account
from blog_article.models import Article
from blog_extra.models import Settings
from blog_link.models import Link
from blog_tag.models import Tag
from utils import backends
from utils.pagination import LimitPagePagination
from .permissions import IsSuperuserPermission
from .serializers import LinkViewSetListSerializer, LinkViewSetCreateSerializer, LinkViewSetUpdateSerializer, \
    LinkViewSetRetrieveSerializer, TagViewSetListSerializer, TagViewSetCreateSerializer, TagViewSetRetrieveSerializer, \
    TagViewSetUpdateSerializer, AccountViewSetListSerializer, AccountViewSetUpdateSerializer, \
    ArticleViewSetListSerializer, ArticleViewSetCreateSerializer, ArticleViewSetUpdateSerializer, \
    ArticleViewSetRetrieveSerializer, SettingsViewSetListSerializer, SettingsViewSetCreateSerializer


# Create your views here.

class LinkViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    """
    list:
    友情链接-列表

    create:
    友情链接-创建

    update:
    友情链接-更新

    retrieve:
    友情链接-详情
    """
    queryset = Link.objects.order_by("-id")
    permission_classes = (IsSuperuserPermission,)
    pagination_class = LimitPagePagination
    filter_backends = (backends.SearchBackend, DjangoFilterBackend)
    search_fields = ('name', 'url')
    filter_fields = ('is_del',)

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
    filter_backends = (backends.SearchBackend, DjangoFilterBackend)
    search_fields = ('name', )
    filter_fields = ('is_del',)

    def get_serializer_class(self):
        if self.action == 'list':
            return TagViewSetListSerializer
        elif self.action == 'create':
            return TagViewSetCreateSerializer
        elif self.action == 'update':
            return TagViewSetUpdateSerializer
        return TagViewSetRetrieveSerializer


class AccountViewSet(mixins.ListModelMixin,
                     mixins.UpdateModelMixin,
                     viewsets.GenericViewSet):
    """
    list:
    用户-列表

    update:
    用户-更新
    """
    queryset = Account.objects.order_by("-id")
    permission_classes = (IsSuperuserPermission,)
    pagination_class = LimitPagePagination
    filter_backends = (backends.SearchBackend, DjangoFilterBackend)
    search_fields = ('email', 'nick_name')
    filter_fields = ('is_active',)

    def get_serializer_class(self):
        if self.action == 'list':
            return AccountViewSetListSerializer
        return AccountViewSetUpdateSerializer


class ArticleViewSet(mixins.ListModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    """
    list:
    文章-列表

    create:
    文章-创建

    update:
    文章-更新

    retrieve:
    文章-详情
    """
    queryset = Article.objects.order_by("-id")
    permission_classes = (IsSuperuserPermission,)
    pagination_class = LimitPagePagination
    filter_backends = (backends.SearchBackend, DjangoFilterBackend)
    search_fields = ('title',)
    filter_fields = ('status', 'type')

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleViewSetListSerializer
        elif self.action == 'create':
            return ArticleViewSetCreateSerializer
        elif self.action == 'update':
            return ArticleViewSetUpdateSerializer
        return ArticleViewSetRetrieveSerializer


class SettingsViewSet(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Settings.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return SettingsViewSetListSerializer
        return SettingsViewSetCreateSerializer

    def list(self, request, *args, **kwargs):
        """
        设置-列表
        """
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response({item["key"]: item["value"] for item in serializer.data})

    def create(self, request, *args, **kwargs):
        """
        设置-创建/更新
        """
        for key, value in request.data.items():
            instance, _ = Settings.objects.get_or_create(key=key)
            instance.value = value
            instance.save()
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response({item["key"]: item["value"] for item in serializer.data}, status=status.HTTP_201_CREATED)
