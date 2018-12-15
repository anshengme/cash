from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('', views.TagViewSet, base_name='tag')
urlpatterns = []

urlpatterns += router.urls
