from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from poll import views

app_name = 'poll'

urlpatterns = [
    path('', views.AvailablePolls.as_view(), name='available_polls'),
    path('create/', views.CreatePoll.as_view(), name='create_poll'),
    path('edit/<int:pk>/', views.UpdatePoll.as_view(), name='update_poll'),
    path('delete/<int:pk>/', views.DeletePoll.as_view(), name='delete_poll'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
