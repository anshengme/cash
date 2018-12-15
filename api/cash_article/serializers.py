from rest_framework import serializers

from utils.serializers import AccountInfoSerializers


class TopicArticleViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()


class HotArticleViewSetListSerializer(TopicArticleViewSetListSerializer):
    view_count = serializers.IntegerField()
    comment_count = serializers.IntegerField()


class ArticleViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    img = serializers.CharField()
    view_count = serializers.IntegerField()
    comment_count = serializers.IntegerField()
    release_time = serializers.DateTimeField()
    tags = serializers.SerializerMethodField()

    def get_tags(self, instance):
        """ 或者文章关联列表 """
        return instance.tags.values_list("name", flat=True)


class ArchiveViewSetListSerializer(TopicArticleViewSetListSerializer):
    release_time = serializers.DateTimeField()


class ArticleViewSetRetrieveSerializer(ArticleViewSetListSerializer):
    id = serializers.IntegerField()
    content = serializers.CharField()
    keywords = serializers.CharField()

    def to_representation(self, instance):
        instance.view_count += 1
        instance.save()
        return super().to_representation(instance)


class ArticleCommentViewSetListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    account = AccountInfoSerializers()
    ct = serializers.DateTimeField()
    content = serializers.CharField()
    reply_id = serializers.SerializerMethodField()
    children = serializers.ListField(default=[])

    def get_reply_id(self, instance):
        return instance.reply.pk if instance.reply else None
