from rest_framework import serializers


class TagViewSetListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    article_count = serializers.IntegerField()
