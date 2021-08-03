from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from poll import views

app_name = 'poll'

urlpatterns = [
    path('polls/', views.AvailablePolls.as_view(), name='available_polls'),
    path('polls/create/', views.CreatePoll.as_view(), name='create_poll'),
    path('polls/edit/<int:pk>/', views.UpdatePoll.as_view(), name='update_poll'),
    path('polls/delete/<int:pk>/', views.DeletePoll.as_view(), name='delete_poll'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
