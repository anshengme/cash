from rest_framework import serializers

from blog_extra.models import Setting
from blog_link.models import Link
from blog_tag.models import Tag


class LinkViewSetListSerializer(serializers.Serializer):
    """
    友情链接-列表
    """
    name = serializers.CharField()
    url = serializers.CharField()


class LinkViewSetCreateSerializer(serializers.ModelSerializer):
    """
    友情链接-创建
    """

    class Meta:
        model = Link
        fields = '__all__'


class LinkViewSetUpdateSerializer(LinkViewSetCreateSerializer):
    """
    友情链接-更新
    """
    pass


class LinkViewSetRetrieveSerializer(LinkViewSetCreateSerializer):
    """
    友情链接-详情
    """
    pass


class TagViewSetCreateSerializer(serializers.ModelSerializer):
    """
    标签-创建
    """

    class Meta:
        model = Tag
        fields = '__all__'


class TagViewSetListSerializer(TagViewSetCreateSerializer):
    """
    标签-列表
    """
    article_count = serializers.IntegerField()


class TagViewSetUpdateSerializer(TagViewSetCreateSerializer):
    """
    标签-更新
    """
    pass


class TagViewSetRetrieveSerializer(TagViewSetCreateSerializer):
    """
    标签-详情
    """
    pass


class SettingViewSetUpdateSerializer(serializers.ModelSerializer):
    """
    站点设置-更新
    """

    class Meta:
        model = Setting
        fields = '__all__'


class SettingViewSetListSerializer(SettingViewSetUpdateSerializer):
    """
    站点设置-列表（详情）
    """
    pass
