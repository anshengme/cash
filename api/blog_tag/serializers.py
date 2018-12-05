from rest_framework import serializers


class TagViewSetListSerializer(serializers.Serializer):
    name = serializers.CharField()
    article_count = serializers.IntegerField()
