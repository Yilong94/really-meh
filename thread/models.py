from django.db import models

from extended_user.models import ExtendedUser


class Thread(models.Model):
    content = models.TextField()
    creatorUser = models.ForeignKey(ExtendedUser, on_delete=models.SET_NULL, null=True)
    archivedAt = models.DateTimeField(default=None)
    publishedAt = models.DateTimeField(default=None)
    editedAt = models.DateTimeField(default=None)

    ratings = models.ManyToManyField(
        ExtendedUser,
        related_name='user_rating',
        through='rating.Rating',
        through_fields=('thread', 'user'),
    )

    votes = models.ManyToManyField(
        ExtendedUser,
        related_name='user_votes',
        through='vote.ThreadVote',
        through_fields=('thread', 'user')
    )
