from django.contrib.sitemaps import Sitemap

from cash_article.models import Article


class BlogSitemap(Sitemap):
    changefreq = "daily"
    priority = 1.0
    protocol = 'https'

    def items(self):
        return Article.objects.filter(status=1).order_by('-release_time')

    def lastmod(self, obj):
        return obj.release_time

    def location(self, item):
        return '/article/{}'.format(item.url)
