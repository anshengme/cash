from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('login', views.LoginViewSet, base_name='login')
urlpatterns = []

urlpatterns += router.urls
