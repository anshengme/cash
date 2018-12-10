from rest_framework import serializers


class AccountInfoSerializers(serializers.Serializer):
    """ 用户个人信息 """
    nick_name = serializers.CharField()
    email = serializers.EmailField()
    avatar = serializers.CharField()
