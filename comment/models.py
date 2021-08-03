from django.db import models


class Comment(models.Model):
    content = models.TextField()
    poll = models.ForeignKey('poll.Poll', on_delete=models.CASCADE)
    editedAt = models.DateTimeField(default=None, null=True)
    publishedAt = models.DateTimeField(default=None, null=True)

    votes = models.ManyToManyField('extended_user.ExtendedUser', through='vote.CommentVote',
                                   through_fields=('comment', 'user'))
