from rest_framework import serializers


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
