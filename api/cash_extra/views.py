import base64
import hashlib
import os
import uuid

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from django.utils import timezone
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cash import static
from utils.error_code import HTTP_ERROR_CODE
from utils.exceptions import BadRequest
from .models import Settings
from .serializers import SettingsViewSetListSerializer, ImageViewSetCreateSerializer


# Create your views here.

class SettingsViewSet(mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingsViewSetListSerializer

    def list(self, request, *args, **kwargs):
        """
        设置
        """
        queryset = self.get_serializer(self.get_queryset(), many=True).data
        return Response({item["key"]: item["value"] for item in queryset})


class ImageViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ImageViewSetCreateSerializer
    _img_type = None

    def create(self, request, *args, **kwargs):
        """
        上传图片
        """
        img = request.FILES.get('img')
        if isinstance(img, InMemoryUploadedFile) or isinstance(img, TemporaryUploadedFile):
            ImageViewSet._img_type = 'file'
        else:
            img = request.data.get('img')
            if isinstance(img, str) and 'base64' in img:
                ImageViewSet._img_type = 'base64'
            else:
                raise BadRequest(HTTP_ERROR_CODE[4001])
        img, img_dir, img_name = self._generate_img_info(request)
        if not os.path.exists(img_dir):
            os.makedirs(img_dir)
        img_path = os.path.join(img_dir, img_name)
        with open(img_path, 'wb+') as img_destination:
            if self._img_type == 'base64':
                img_destination.write(base64.decodebytes(bytes(img, encoding='utf-8')))
            else:
                for chunk in img.readlines():
                    img_destination.write(chunk)
        return Response({'path': img_path.split(settings.MEDIA_ROOT, 1)[-1]}, status=status.HTTP_201_CREATED)

    @classmethod
    def _generate_img_info(cls, request):
        current_time = timezone.now()
        img_dir = os.path.join(settings.BASE_DIR, settings.MEDIA_ROOT, '%s/%d/%d/%d/' % (
            static.IMAGE_UPLOAD_PATH, current_time.year, current_time.month, current_time.day))
        if cls._img_type == 'file':
            img = request.FILES.get('img')
            img_name, img_type = cls._generate_img_name(img, img_dir)
            return img, img_dir, img_name + '.' + img_type
        else:
            img = request.data.get('img')
            img_data, base64_data = img.split(',', 1)
            img_name = str(uuid.uuid4()).replace('-', '') + '.' + img_data.split('/')[1].split(';')[0]
            return base64_data, img_dir, img_name

    @classmethod
    def _generate_img_name(cls, img, img_dir):
        """
        Recursively get the img name
        """
        img_name_list = img.name.split('.')
        img_name, img_type = '.'.join(img_name_list[:-1]), img_name_list[len(img_name_list) - 1]
        hash = hashlib.md5()
        hash.update(bytes(str(uuid.uuid4()).replace('-', '') + img_name, encoding='utf-8'))
        name = hash.hexdigest()
        img_path = os.path.join(settings.BASE_DIR, img_dir, name + '.' + img_type)
        if os.path.exists(img_path):
            return cls._generate_img_name(img_dir, img_type)
        return name, img_type
