from rest_framework import serializers

from .models import Comment


class CommentViewSetCreateSerializer(serializers.ModelSerializer):
    """
    评论-添加评论
    """
    account = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = '__all__'
