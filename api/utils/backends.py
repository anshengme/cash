from django.utils.translation import ugettext_lazy as _
from rest_framework.filters import SearchFilter


class SearchBackend(SearchFilter):
    search_description = _('搜索，默认对字段模糊搜索')
