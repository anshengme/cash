from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import APIException


class BadRequest(APIException):
    status_code = 400
    default_detail = _('参数错误')


class Unauthorized(APIException):
    status_code = 401
    default_detail = _('认证失败')


class Forbidden(APIException):
    status_code = 403
    default_detail = _('无权访问')


class NotFound(APIException):
    status_code = 404
    default_detail = _('未找到')
