from rest_framework import serializers

from cash_article.serializers import ArticleViewSetListSerializer
from .models import Tag


class TagViewSetListSerializer(serializers.Serializer):
    name = serializers.CharField()
    article_count = serializers.IntegerField()


class TagViewSetRetrieveSerializer(serializers.ModelSerializer):
    article_list = serializers.SerializerMethodField()

    def get_article_list(self, instance):
        print("2")
        article_list = instance.article_set.filter(type=1, status=1).order_by("-release_time")
        data = ArticleViewSetListSerializer(article_list, many=True).data
        print(data, "1")
        return data

    class Meta:
        model = Tag
        fields = ('name', 'article_list')
