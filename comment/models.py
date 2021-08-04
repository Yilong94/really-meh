from django.db import models
from django.db.models import Count


class Comment(models.Model):
    content = models.TextField()
    creatorUser = models.ForeignKey('extended_user.ExtendedUser', on_delete=models.SET_NULL, null=True,
                                    related_name='comment_creator')
    poll = models.ForeignKey('poll.Poll', on_delete=models.CASCADE)
    editedAt = models.DateTimeField(default=None, null=True, blank=True)
    publishedAt = models.DateTimeField(default=None, null=True, blank=True)
    archivedAt = models.DateTimeField(default=None, null=True, blank=True)

    votes = models.ManyToManyField('extended_user.ExtendedUser', through='vote.CommentVote',
                                   through_fields=('comment', 'user'))

    @property
    def user_votes(self):
        user_votes = self.votes.values('commentvote__direction').annotate(count=Count('commentvote__direction'))
        return {rating['commentvote__direction']: rating['count'] for rating in user_votes}
