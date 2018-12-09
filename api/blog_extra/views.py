from rest_framework import viewsets, mixins
from rest_framework.response import Response

from .models import Settings
from .serializers import SettingsViewSetListSerializer


# Create your views here.

class SettingsViewSet(mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingsViewSetListSerializer

    def list(self, request, *args, **kwargs):
        """
        设置
        """
        return Response(self.get_serializer(self.get_queryset(), many=True).data)
