from rest_framework_jwt.settings import api_settings as jwt_settings

jwt_payload_handler = jwt_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = jwt_settings.JWT_ENCODE_HANDLER


def get_jwt_token(account):
    """
    生成用户jwt token并返回
    :param account: 用户
    :return: token
    """
    payload = jwt_payload_handler(account)
    token = jwt_encode_handler(payload)
    return token
