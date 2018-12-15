from rest_framework import serializers


class LinkViewSetListSerializer(serializers.Serializer):
    name = serializers.CharField()
    url = serializers.CharField()
