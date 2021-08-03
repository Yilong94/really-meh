from django.db import models

from vote.choices import VOTE_CHOICES


class VoteManager(models.Manager):
    pass


class Vote(models.Model):
    user = models.ForeignKey('extended_user.ExtendedUser', on_delete=models.SET_NULL, null=True)
    direction = models.CharField(null=True, choices=VOTE_CHOICES, max_length=6)

    objects = VoteManager

    class Meta:
        abstract = True


class CommentVote(Vote):
    comment = models.ForeignKey('comment.Comment', on_delete=models.SET_NULL, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['comment', 'user'], name="unique_comment_vote")
        ]


class PollVote(Vote):
    poll = models.ForeignKey('poll.Poll', on_delete=models.SET_NULL, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['poll', 'user'], name="unique_poll_vote")
        ]



