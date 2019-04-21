from django.views import generic

from utils.mixins import BaseViewMixin, DetailViewMixin
from .models import Article
from .serializers import ArticleViewSetRetrieveSerializer, ArticleViewSetListSerializer


# Create your views here.

class ArticleListView(BaseViewMixin,
                      generic.ListView):
    """
    首页
    """
    queryset = Article.objects.filter(type=1, status=1).order_by("-release_time")
    paginate_by = 10
    template_name = 'views/article_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = ArticleViewSetListSerializer(context['object_list'], many=True).data
        context['banner_list'] = self.queryset.filter(img__isnull=False).values("title", "img", "url")[:5]
        return context


class ArticleDetailView(DetailViewMixin,
                        BaseViewMixin,
                        generic.DetailView):
    """
    文章详情页
    """
    model = Article
    template_name = 'views/article_detail.html'
    serializer_class = ArticleViewSetRetrieveSerializer

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        queryset = Article.objects.filter(type=1, status=1).order_by("-release_time")[:5]
        context['recommend_article_list'] = ArticleViewSetListSerializer(queryset, many=True).data
        return context
