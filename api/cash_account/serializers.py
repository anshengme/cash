from rest_framework import serializers


class LogInViewSetCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text="邮箱")
    password = serializers.CharField(help_text="密码")


class DetailViewSetListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    nick_name = serializers.CharField()
    avatar = serializers.CharField()
    is_superuser = serializers.BooleanField()
