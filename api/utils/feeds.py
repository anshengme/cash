from django.contrib.syndication.views import Feed
from django.utils.feedgenerator import Atom1Feed
from django.utils.feedgenerator import Rss201rev2Feed

from cash_article.models import Article


class ExtendedRSSFeed(Rss201rev2Feed):
    mime_type = 'application/xml'


class RssSiteNewsFeed(Feed):
    feed_type = ExtendedRSSFeed
    author_name = "ansheng"
    title = "Welcome to ansheng’s blog!"
    link = "https://blog.ansheng.me/"
    description = "ansheng"
    feed_url = 'https://blog.ansheng.me/rss.xml'

    def items(self):
        return Article.objects.filter(status=1).order_by('-release_time')

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.description

    def item_link(self, item):
        return '/article/{}/'.format(item.url)

    def item_pubdate(self, item):
        return item.release_time

    def item_guid(self, item):
        return


class AtomSiteNewsFeed(RssSiteNewsFeed):
    feed_type = Atom1Feed
    subtitle = RssSiteNewsFeed.description
