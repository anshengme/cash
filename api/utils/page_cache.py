import hashlib


def get_cache_key(request):
    """ 生成页面缓存KEY """
    md5 = hashlib.md5()
    md5.update(bytes(request.path + str(dict(request.GET)) + str(dict(request.data)), encoding='utf-8'))
    return md5.hexdigest().upper()


def calculate_cache_key(view_instance, view_method, request, args, kwargs):
    """ 生成赛事API缓存KEY """
    return get_cache_key(request)
