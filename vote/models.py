from django.db import models

from comment.models import Comment
from thread.models import Thread
from extended_user.models import ExtendedUser


class VoteManager(models.Manager):
    pass


class Vote(models.Model):
    user = models.ForeignKey(ExtendedUser, on_delete=models.SET_NULL, null=True)

    objects = VoteManager

    class Meta:
        abstract = True


class CommentVote(Vote):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)


class ThreadVote(Vote):
    thread = models.ForeignKey(Thread, on_delete=models.SET_NULL, null=True)



