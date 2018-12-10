from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from blog_article.serializers import ArticleCommentViewSetListSerializer
from utils.common import get_comments
from .models import Comment
from .serializers import CommentViewSetCreateSerializer


# Create your views here.

class CommentViewSet(mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    queryset = Comment.objects.filter(is_del=False)
    serializer_class = CommentViewSetCreateSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        """
        添加评论
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        data = ArticleCommentViewSetListSerializer(instance).data
        if instance.reply:
            comments = instance.article.comment_set.filter(is_del=False)
            return Response(get_comments(ArticleCommentViewSetListSerializer(comments, many=True).data))
        return Response(data, status=status.HTTP_201_CREATED)
