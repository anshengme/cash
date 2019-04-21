from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include

from cash_article.views import ArticleListView, ArticleDetailView
from cash_extra.views import ArchiveListView
from utils.feeds import RssSiteNewsFeed, AtomSiteNewsFeed
from utils.sitemap import BlogSitemap

urlpatterns = [
    path('', ArticleListView.as_view(), name='article-list'),
    path('article/<str:url>/', ArticleDetailView.as_view(), name='article-detail'),
    path('archive/', ArchiveListView.as_view(), name='archive'),
    path('tag/', include('cash_tag.urls')),
    path('admin/', admin.site.urls),
    path('rss.xml', RssSiteNewsFeed()),
    path('atom.xml', AtomSiteNewsFeed()),
    path('sitemap.xml', sitemap, {'sitemaps': {'static': BlogSitemap}}, name='django.contrib.sitemaps.views.sitemap'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
