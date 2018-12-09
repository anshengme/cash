from rest_framework import serializers


class SettingsViewSetListSerializer(serializers.Serializer):
    key = serializers.CharField()
    value = serializers.CharField()
