from django.conf import settings
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('account/', include('cash_account.urls')),
    path('link/', include('cash_link.urls')),
    path('tag/', include('cash_tag.urls')),
    path('extra/', include('cash_extra.urls')),
    path('admin/', include('cash_admin.urls')),
    path('article/', include('cash_article.urls')),
    path('comment/', include('cash_comment.urls')),
]

if settings.DEBUG:
    urlpatterns.append(path('docs/', include_docs_urls(title='CASH API Docs.', authentication_classes=[], permission_classes=[])))
