from rest_framework import serializers


class SettingViewSetListSerializer(serializers.Serializer):
    title = serializers.CharField()
    keywords = serializers.CharField()
    description = serializers.CharField()
    avatar = serializers.CharField()
