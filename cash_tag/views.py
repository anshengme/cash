from django.views import generic

from utils.mixins import BaseViewMixin, DetailViewMixin
from .models import Tag
from .serializers import TagViewSetListSerializer, TagViewSetRetrieveSerializer


# Create your views here.

class TagListView(BaseViewMixin,
                  generic.ListView):
    """
    标签列表页
    """
    model = Tag
    template_name = 'views/tag_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['object_list'] = TagViewSetListSerializer(context['object_list'], many=True).data
        return context


class TagDetailView(DetailViewMixin,
                    BaseViewMixin,
                    generic.DetailView):
    """
    标签详情页
    """
    model = Tag
    template_name = 'views/tag_detail.html'
    serializer_class = TagViewSetRetrieveSerializer
