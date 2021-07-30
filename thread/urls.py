from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from thread import views

app_name = 'thread'

urlpatterns = [
    path('threads/', views.ThreadList.as_view(), name='threads'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
