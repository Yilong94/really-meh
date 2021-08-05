from django.contrib import admin

from vote.models import PollVote, CommentVote

admin.site.register(PollVote)
admin.site.register(CommentVote)

