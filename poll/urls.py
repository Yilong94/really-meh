from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from poll import views

app_name = 'poll'

urlpatterns = [
    path('polls/', views.AvailablePolls.as_view(), name='polls'),
    path('polls/', views.CreatePoll.as_view(), name='polls'),
    path('polls/<int:pk>', views.UpdatePoll.as_view(), name='polls'),
    path('polls/<int:pk>', views.DeletePoll.as_view(), name='polls'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
