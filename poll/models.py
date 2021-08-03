from django.db import models
from django.db.models import Count

from comment.models import Comment


class Poll(models.Model):
    title = models.TextField()
    content = models.TextField()
    tags = models.TextField(default="[]")
    creatorUser = models.ForeignKey('extended_user.ExtendedUser', on_delete=models.SET_NULL, null=True)
    archivedAt = models.DateTimeField(default=None, null=True, blank=True)
    publishedAt = models.DateTimeField(default=None, null=True, blank=True)
    editedAt = models.DateTimeField(default=None, null=True, blank=True)

    ratings = models.ManyToManyField(
        'extended_user.ExtendedUser',
        related_name='user_rating',
        through='rating.Rating',
        through_fields=('poll', 'user'),
    )

    votes = models.ManyToManyField(
        'extended_user.ExtendedUser',
        related_name='user_votes',
        through='vote.PollVote',
        through_fields=('poll', 'user')
    )

    @property
    def user_ratings(self):
        user_ratings = self.ratings.values('rating__rating').annotate(count=Count('rating__rating'))
        return {rating['rating__rating']: rating['count'] for rating in user_ratings}

    @property
    def number_of_user_comments(self):
        return Comment.objects.filter(poll=self).count()
