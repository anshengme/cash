from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('login', views.LoginViewSet, base_name='login')
urlpatterns = [
    path('detail/', views.DetailViewSet.as_view({'get': 'list'})),
]

urlpatterns += router.urls
