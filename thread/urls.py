from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from thread import views

app_name = 'thread'

urlpatterns = [
    path('threads/', views.AvailableThreads.as_view(), name='threads'),
    path('threads/', views.CreateThread.as_view(), name='threads'),
    path('threads/<int:pk>', views.UpdateThread.as_view(), name='threads'),
    path('threads/<int:pk>', views.DeleteThread.as_view(), name='threads'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
