from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from comment import views

app_name = 'comment'

urlpatterns = [
    path('', views.AvailableComments.as_view(), name='available_comments'),
    path('create/', views.CreateComment.as_view(), name='create_comment'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
