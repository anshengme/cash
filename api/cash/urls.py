from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

from utils.feeds import RssSiteNewsFeed, AtomSiteNewsFeed
from utils.sitemap import BlogSitemap

urlpatterns = [
    path('rss.xml', RssSiteNewsFeed()),
    path('atom.xml', AtomSiteNewsFeed()),
    path('sitemap.xml', sitemap, {'sitemaps': {'static': BlogSitemap}}, name='django.contrib.sitemaps.views.sitemap'),
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
