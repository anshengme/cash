from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('', views.CommentViewSet, base_name='comment')
urlpatterns = []

urlpatterns += router.urls
