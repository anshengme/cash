from collections import OrderedDict

from django.core.paginator import PageNotAnInteger, EmptyPage
from django.utils.translation import ugettext_lazy as _
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class LimitPagePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    page_size_query_description = _('每页显示多少条，默认10条')
    page_query_param = 'page'
    page_query_description = _('显示第几页的数据，默认第一页')
    _page_limit = None
    _page_pages = None

    def paginate_queryset(self, queryset, request, view=None):
        page_size = self.get_page_size(request)
        self._page_limit = page_size  # 每页条数
        if page_size == 0:
            page_size = queryset.count()

        paginator = self.django_paginator_class(queryset, page_size)

        self._page_pages = paginator.num_pages  # 总页数

        page_number = request.query_params.get(self.page_query_param, 1)  # 第几页
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        try:
            self.page = paginator.page(page_number)
        except PageNotAnInteger:
            self.page = paginator.page(1)
        except EmptyPage:
            self.page = paginator.page(paginator.num_pages)
        self.request = request
        return list(self.page)

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('page', self.page.number),
            ('total', self.page.paginator.count),
            ('data', data),
            ('limit', self._page_limit),
            ('page_count', self._page_pages)
        ]))
