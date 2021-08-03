from django.db import models

from extended_user.models import ExtendedUser


class Poll(models.Model):
    title = models.TextField()
    content = models.TextField()
    creatorUser = models.ForeignKey(ExtendedUser, on_delete=models.SET_NULL, null=True)
    archivedAt = models.DateTimeField(default=None, null=True)
    publishedAt = models.DateTimeField(default=None, null=True)
    editedAt = models.DateTimeField(default=None, null=True)

    ratings = models.ManyToManyField(
        ExtendedUser,
        related_name='user_rating',
        through='rating.Rating',
        through_fields=('poll', 'user'),
    )

    votes = models.ManyToManyField(
        ExtendedUser,
        related_name='user_votes',
        through='vote.PollVote',
        through_fields=('poll', 'user')
    )
