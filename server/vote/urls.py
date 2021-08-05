from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from vote import views

app_name = 'vote'

urlpatterns = [
    path('poll/', views.PollVoteView.as_view(), name='vote_poll'),
    path('comment/', views.CommentVoteView.as_view(), name='vote_comment'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
