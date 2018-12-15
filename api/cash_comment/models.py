from django.db import models

from utils.models import BaseModel
from cash_article.models import Article
from cash_account.models import Account


# Create your models here.


class Comment(BaseModel):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, help_text="关联文章")
    account = models.ForeignKey(Account, on_delete=models.CASCADE, help_text="用户")
    content = models.TextField(help_text="评论内容")
    reply = models.ForeignKey("Comment", on_delete=models.CASCADE, null=True, blank=True, help_text="回复的评论")

    class Meta:
        db_table = "comment"
