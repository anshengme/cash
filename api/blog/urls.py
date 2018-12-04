from django.urls import path, include

urlpatterns = [
    path('account/', include('blog_account.urls')),
    path('link/', include('blog_link.urls')),
    path('tag/', include('blog_tag.urls')),
    path('extra/', include('blog_extra.urls')),
    path('admin/', include('blog_admin.urls')),
    path('article/', include('blog_article.urls')),
]
