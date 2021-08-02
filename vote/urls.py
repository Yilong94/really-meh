from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from vote import views

app_name = 'vote'

urlpatterns = [
    path('votes/', views.AvailableThreads.as_view(), name='votes'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
