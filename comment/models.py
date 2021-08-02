from django.db import models

from thread.models import Thread
from extended_user.models import ExtendedUser


class Comment(models.Model):
    content = models.TextField()
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    editedAt = models.DateTimeField(default=None, null=True)
    publishedAt = models.DateTimeField(default=None, null=True)

    votes = models.ManyToManyField(ExtendedUser, through='vote.CommentVote', through_fields=('comment', 'user'))
