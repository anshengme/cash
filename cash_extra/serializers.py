from rest_framework import serializers

from cash import static


class ArchiveViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()
    release_time = serializers.DateTimeField(format=static.DATE_FORMAT)
