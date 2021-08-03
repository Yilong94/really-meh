from django.db import models

from comment.models import Comment
from poll.models import Poll
from extended_user.models import ExtendedUser


class VoteManager(models.Manager):
    pass


class Vote(models.Model):
    UP = 'UP'
    DOWN = 'DWN'
    VOTE_CHOICES = [
        (UP, 'Up'),
        (DOWN, 'Down'),
    ]

    user = models.ForeignKey(ExtendedUser, on_delete=models.SET_NULL, null=True)
    direction = models.CharField(null=True, choices=VOTE_CHOICES, max_length=6)

    objects = VoteManager

    class Meta:
        abstract = True


class CommentVote(Vote):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['comment', 'user'], name="unique_comment_vote")
        ]


class PollVote(Vote):
    poll = models.ForeignKey(Poll, on_delete=models.SET_NULL, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['poll', 'user'], name="unique_poll_vote")
        ]



