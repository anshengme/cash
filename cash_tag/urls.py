from django.urls import path

from . import views

urlpatterns = [
    path('', views.TagListView.as_view(), name='tag-list'),
    path('<str:name__iexact>/', views.TagDetailView.as_view(), name='tag-detail')
]
