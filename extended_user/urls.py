from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from extended_user import views

app_name = 'extended_user'

urlpatterns = [
    path('signup/', views.UserSignUp.as_view(), name='user_signup'),
    path('login/', views.UserLogin.as_view(), name='user_login'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
