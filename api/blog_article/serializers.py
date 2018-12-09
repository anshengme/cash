from rest_framework import serializers
from .models import Article


class SeriesArticleViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()


class HotArticleViewSetListSerializer(SeriesArticleViewSetListSerializer):
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


class ArchiveViewSetListSerializer(SeriesArticleViewSetListSerializer):
    release_time = serializers.DateTimeField()


class ArticleViewSetRetrieveSerializer(ArticleViewSetListSerializer):
    content = serializers.CharField()
