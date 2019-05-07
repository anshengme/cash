from markdown import markdown
from rest_framework import serializers

from cash import static


class ArticleViewSetListSerializer(serializers.Serializer):
    url = serializers.CharField()
    title = serializers.CharField()
    description = serializers.CharField()
    img = serializers.SerializerMethodField()
    view_count = serializers.IntegerField()
    ct = serializers.DateTimeField(format=static.DATE_FORMAT)
    tags = serializers.SerializerMethodField()
    is_top = serializers.BooleanField()

    def get_img(self, instance):
        return '/' + instance.img if instance.img and not instance.img.startswith('/') else instance.img

    def get_tags(self, instance):
        return instance.tags.values_list("name", flat=True)


class ArticleViewSetRetrieveSerializer(ArticleViewSetListSerializer):
    id = serializers.IntegerField()
    content = serializers.CharField()
    keywords = serializers.CharField()

    def to_representation(self, instance):
        instance.view_count += 1
        instance.save()
        instance.content = markdown(instance.content, extensions=[
            "markdown.extensions.abbr",
            "markdown.extensions.admonition",
            "markdown.extensions.attr_list",
            "markdown.extensions.codehilite",
            "markdown.extensions.def_list",
            "markdown.extensions.extra",
            "markdown.extensions.fenced_code",
            "markdown.extensions.footnotes",
            "markdown.extensions.legacy_attrs",
            "markdown.extensions.meta",
            "markdown.extensions.nl2br",
            "markdown.extensions.sane_lists",
            "markdown.extensions.smarty",
            "markdown.extensions.tables",
            "markdown.extensions.toc",
            "markdown.extensions.wikilinks"
        ])
        return super().to_representation(instance)
