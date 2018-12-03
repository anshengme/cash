from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from utils.error_code import HTTP_ERROR_CODE
from utils.exceptions import Unauthorized
from .models import Account
from .serializers import LogInViewSetCreateSerializer
from .utils import get_jwt_token


# Create your views here.


class LoginViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    queryset = Account.objects.all()
    serializer_class = LogInViewSetCreateSerializer

    def create(self, request, *args, **kwargs):
        """
        登录 / 用户不存在则创建
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        queryset = self.get_queryset()
        account = authenticate(username=email, password=password)
        if not account and queryset.filter(username=email):
            raise Unauthorized(HTTP_ERROR_CODE[4101])
        if not account:
            is_superuser = True if not queryset.count() else False
            account = Account.objects.create_user(username=email, email=email, is_superuser=is_superuser)
            account.set_password(password)
            account.save()
            # Todo: 新用户发送激活邮件
        account.last_login = timezone.now()
        account.save()
        token = get_jwt_token(account)
        return Response({"token": token})
