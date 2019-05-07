from rest_framework import serializers

from cash import static


class ArchiveViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()
    ct = serializers.DateTimeField(format=static.DATE_FORMAT)
