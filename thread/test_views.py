from datetime import datetime

from django.urls import reverse
from rest_framework.test import APIRequestFactory, force_authenticate
from django.test import TestCase

# Create your tests here.
from extended_user.models import ExtendedUser
from thread import views
from thread.models import Thread


class ThreadTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='some user', email='email@email.com')
        cls.user_test.set_password('1234')
        cls.user_test.is_superuser = True
        cls.user_test.save()

        cls.factory = APIRequestFactory()

        cls.some_data = Thread.objects.create(archivedAt=datetime.now())

    def setUp(self):
        self.view = views.ThreadList.as_view()

    @classmethod
    def get_api_request(cls, reverse_url, data, authenticating_user, factory_func, **kwargs):
        reverse_kwargs = kwargs.pop('reverse_kwargs', {})
        auth_kwargs = kwargs.pop('auth_kwargs', {})
        request = factory_func(reverse(reverse_url, **reverse_kwargs), data, **kwargs)
        force_authenticate(request, user=authenticating_user, **auth_kwargs)
        return request

    def view_helper(self, url, pk, data, function, view):
        reverse_kwargs = {'kwargs': {'pk': pk}}
        request = self.get_api_request(url, data, self.user_test, function, format='json', reverse_kwargs=reverse_kwargs)
        response = view(request, pk=pk)
        return response

    def test_one(self):
        request = self.get_api_request('thread:threads', {}, self.user_test, self.factory.get, format='json')

        response = self.view(request)
        print("response?", response.data)


