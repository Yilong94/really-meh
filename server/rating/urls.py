from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from rating import views

app_name = 'rating'

urlpatterns = [
    path('rate/', views.CreateRatingsView.as_view(), name='create_ratings'),
    path('update/', views.UpdateRatingsView.as_view(), name='update_ratings'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
