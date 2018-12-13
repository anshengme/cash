from rest_framework import serializers


class SettingsViewSetListSerializer(serializers.Serializer):
    key = serializers.CharField()
    value = serializers.CharField()


class ImageViewSetCreateSerializer(serializers.Serializer):
    img = serializers.FileField(help_text='文件格式或者base64加密后格式的图片')
