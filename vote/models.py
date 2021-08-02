from django.db import models

from comment.models import Comment
from poll.models import Poll
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


class PollVote(Vote):
    poll = models.ForeignKey(Poll, on_delete=models.SET_NULL, null=True)



