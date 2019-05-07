from django.views import generic

from cash_article.models import Article
from utils.mixins import BaseViewMixin
from .serializers import ArchiveViewSetListSerializer


# Create your views here.


class ArchiveListView(BaseViewMixin,
                      generic.ListView):
    """
    归档页
    """
    queryset = Article.objects.filter(type=1, status=1).order_by("-ct")
    template_name = 'views/archive.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        serializer = ArchiveViewSetListSerializer(context['object_list'], many=True)
        archive_data = {}
        for article in serializer.data:
            year = article["ct"][:4]
            if year not in archive_data:
                archive_data[year] = []
            archive_data[year].append(article)
        context["archive_data"] = archive_data
        return context
