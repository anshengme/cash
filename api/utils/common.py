from django.shortcuts import _get_queryset


def get_object_or_none(models, *args, **kwargs):
    """
    :param models: models
    :return: 存在则返回对象，不存在则返回None
    """
    queryset = _get_queryset(models)
    try:
        return queryset.get(*args, **kwargs)
    except AttributeError:
        models__name = models.__name__ if isinstance(models, type) else models.__class__.__name__
        raise ValueError(
            "First argument to get_object_or_none() must be a Model, Manager, "
            "or QuerySet, not '%s'." % models__name
        )
    except queryset.model.DoesNotExist:
        return None


def get_comments(comments):
    """
    生成评论树
    """
    comment_map = {comment['id']: comment for comment in comments}
    comment_tree = []
    for comment in comment_map.values():
        pid = comment['reply_id']
        if pid:
            comment_map[pid]['children'].append(comment)
        else:
            comment_tree.append(comment)
    return comment_tree
