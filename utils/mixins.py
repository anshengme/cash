from django.shortcuts import get_object_or_404

from cash_article.models import Article
from cash_extra.models import Config
from cash_link.models import Link
from cash_tag.models import Tag


class BaseViewMixin(object):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new_article_list'] = Article.objects.filter(type=1, status=1).order_by("-ct")[:5]
        context['tags'] = Tag.objects.all()
        context["link_list"] = Link.objects.all()
        context["topic_list"] = Article.objects.filter(type=2, status=1).order_by("-ct").values("title", "url")
        context["config"] = {item.key: item.value for item in Config.objects.all()}
        url_path = self.request.path
        element_node = None
        if url_path == '/':
            element_node = 'home-nav'
        elif url_path.startswith('/tag'):
            element_node = "tag-nav"
        elif url_path.startswith("/archive"):
            element_node = "archive-nav"
        context["config"]["element_node"] = element_node
        return context


class DetailViewMixin(object):
    serializer_class = None

    def get_object(self, queryset=None):
        instance = get_object_or_404(self.model, **self.kwargs)
        return self.serializer_class(instance).data
