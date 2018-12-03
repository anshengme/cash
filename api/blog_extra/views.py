from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .models import Setting
from .serializers import SettingViewSetListSerializer


# Create your views here.

class SettingViewSet(mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = Setting.objects.all()
    serializer_class = SettingViewSetListSerializer

    def list(self, request, *args, **kwargs):
        """
        站点设置
        """
        return Response(self.get_serializer(self.get_queryset().last()).data)
