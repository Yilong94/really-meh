from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIRequestFactory, force_authenticate

from extended_user import views
from extended_user.models import ExtendedUser
from extended_user.serializers import UserSignUpSerializer, ExtendedUserNameIdSerializer


class UserTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='someuser', email='email@email.com', name='somename')
        cls.user_test.set_password('1234')
        cls.user_test.is_superuser = True
        cls.user_test.save()

        cls.factory = APIRequestFactory()

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


class UserSignUpTestCase(UserTestCase):
    def setUp(self):
        self.view = views.UserSignUp.as_view()

    def test_sign_up(self):
        request = self.get_api_request('user:user_signup',
                                       {'username': 'someuser1', 'password': '12345678ABCRR',
                                        'password2': '12345678ABCRR', 'email': 'abc@email.com', 'name': 'random name'},
                                       self.user_test,
                                       self.factory.post, format='json')

        response = self.view(request)

        the_user = ExtendedUser.objects.filter(username='someuser1').first()
        expected_data = UserSignUpSerializer(the_user).data
        self.assertDictEqual(response.data, expected_data)


class UserLoginTestCase(UserTestCase):
    def setUp(self):
        self.view = views.UserLogin.as_view()

    def test_login(self):
        request = self.get_api_request('user:user_login',
                                       {'username': 'someuser', 'password': '1234'},
                                       self.user_test,
                                       self.factory.post, format='json')

        response = self.view(request)

        expected_data = ExtendedUserNameIdSerializer(instance=self.user_test).data
        self.assertDictEqual(response.data, {'user': expected_data})

    def test_login_no_user(self):
        request = self.get_api_request('user:user_login',
                                       {'username': 'nouser', 'password': '1234'},
                                       self.user_test,
                                       self.factory.post, format='json')

        response = self.view(request)
        self.assertDictEqual(response.data, {'user': None})
