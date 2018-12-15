from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('', views.LinkViewSet, base_name='link')
urlpatterns = []

urlpatterns += router.urls
