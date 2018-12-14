from django.utils import timezone
from rest_framework import serializers

from blog_account.models import Account
from blog_article.models import Article
from blog_link.models import Link
from blog_tag.models import Tag


class LinkViewSetListSerializer(serializers.ModelSerializer):
    """
    友情链接-列表
    """

    class Meta:
        model = Link
        fields = '__all__'


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


class AccountViewSetListSerializer(serializers.ModelSerializer):
    """
    用户-列表
    """

    class Meta:
        model = Account
        fields = ("id", "date_joined", "email", "is_active", "last_login", "nick_name")


class AccountViewSetUpdateSerializer(serializers.Serializer):
    """
    用户-更新
    """
    is_active = serializers.BooleanField(help_text="是否激活")

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()
        return instance


class ArticleViewSetListSerializer(serializers.Serializer):
    """
    文章-列表
    """
    id = serializers.IntegerField()
    title = serializers.CharField()
    status = serializers.IntegerField()
    type = serializers.IntegerField()
    view_count = serializers.IntegerField()
    release_time = serializers.DateTimeField()
    ct = serializers.DateTimeField()


class ArticleViewSetCreateSerializer(serializers.ModelSerializer):
    """
    文章-创建
    """
    tags = serializers.ListField()

    def validate_tags(self, data):
        tags_id = []
        for tag in data:
            instance, _ = Tag.objects.get_or_create(name=tag)
            tags_id.append(instance.pk)
        return tags_id

    def validate(self, attrs):
        if attrs["status"] == 1:
            attrs["release_time"] = timezone.now()
        return attrs

    class Meta:
        model = Article
        fields = "__all__"


class ArticleViewSetUpdateSerializer(serializers.ModelSerializer):
    """
    文章-更新
    """
    tags = serializers.ListField()

    def validate_tags(self, data):
        tags_id = []
        for tag in data:
            instance, _ = Tag.objects.get_or_create(name=tag)
            tags_id.append(instance.pk)
        return tags_id

    def update(self, instance, validated_data):
        validated_data = validated_data.copy()
        status = validated_data.get("status")
        if status != instance.status:
            validated_data["release_time"] = timezone.now() if status == 1 else None
        return super().update(instance, validated_data)

    class Meta:
        model = Article
        fields = "__all__"


class ArticleViewSetRetrieveSerializer(serializers.ModelSerializer):
    """
    文章-详情
    """
    tags = serializers.SerializerMethodField()

    def get_tags(self, instance):
        """ 或者文章关联列表 """
        return instance.tags.values_list("name", flat=True)

    class Meta:
        model = Article
        fields = "__all__"


class SettingsViewSetListSerializer(serializers.Serializer):
    """
    设置-列表
    """
    key = serializers.CharField()
    value = serializers.CharField()


class SettingsViewSetCreateSerializer(SettingsViewSetListSerializer):
    """
    设置-创建 or 更新
    """
    pass


class ArticleTagsViewSetListSerializer(serializers.Serializer):
    name = serializers.CharField()
