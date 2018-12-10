from django.conf import settings
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('account/', include('blog_account.urls')),
    path('link/', include('blog_link.urls')),
    path('tag/', include('blog_tag.urls')),
    path('extra/', include('blog_extra.urls')),
    path('admin/', include('blog_admin.urls')),
    path('article/', include('blog_article.urls')),
    path('comment/', include('blog_comment.urls')),
]

if settings.DEBUG:
    urlpatterns.append(path('docs/', include_docs_urls(title='CASH API Docs.', authentication_classes=[], permission_classes=[])))
