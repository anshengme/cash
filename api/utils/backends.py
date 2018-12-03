from django.utils.encoding import force_text
from django.utils.translation import ugettext_lazy as _
from rest_framework.compat import (coreapi, coreschema)
from rest_framework.filters import OrderingFilter, SearchFilter


class OrderingBackend(OrderingFilter):
    ordering_description = _('排序字段')
    ordering_param = 'column'
    ordering_title = _('Column')

    def filter_queryset(self, request, queryset, view):
        ordering = self.get_ordering(request, queryset, view)
        if ordering is None:
            return queryset
        ordering = ordering[0] if isinstance(ordering, list) else ordering
        ordering_dir = request.query_params.get('dir', 'asc')
        return queryset.order_by('%s' % ordering) if ordering_dir == 'asc' else queryset.order_by('-%s' % ordering)

    def get_schema_fields(self, view):
        fields = super().get_schema_fields(view)
        fields.append(
            coreapi.Field(
                name='dir',
                required=False,
                location='query',
                schema=coreschema.String(
                    title=force_text('Dir'),
                    description=force_text('升序(asc)/降序(desc)，默认是升序')
                ),
            )
        )
        return fields


class SearchBackend(SearchFilter):
    search_description = _('搜索，默认对字段模糊搜索')
