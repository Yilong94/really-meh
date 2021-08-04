from datetime import datetime

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIRequestFactory, force_authenticate

from extended_user.models import ExtendedUser
from poll.models import Poll
from rating import views
from rating.choices import TRUE, FALSE
from rating.models import Rating


class RatingTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='some user', email='email@email.com')
        cls.user_test.set_password('1234')
        cls.user_test.is_superuser = True
        cls.user_test.save()

        cls.factory = APIRequestFactory()

        cls.availablePoll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.now())

        cls.create_data = {
            "user": cls.user_test.pk,
            "poll": cls.availablePoll.pk,
            "rating": TRUE
        }

    @classmethod
    def get_api_request(cls, reverse_url, data, authenticating_user, factory_func, **kwargs):
        reverse_kwargs = kwargs.pop('reverse_kwargs', {})
        auth_kwargs = kwargs.pop('auth_kwargs', {})
        request = factory_func(reverse(reverse_url, **reverse_kwargs), data, **kwargs)
        force_authenticate(request, user=authenticating_user, **auth_kwargs)
        return request

    def view_helper(self, url, pk, data, function, view):
        reverse_kwargs = {'kwargs': {'pk': pk}}
        request = self.get_api_request(url, data, self.user_test, function, format='json',
                                       reverse_kwargs=reverse_kwargs)
        response = view(request, pk=pk)
        return response


class CreateRatingTestCase(RatingTestCase):
    def setUp(self):
        self.view = views.CreateRatingsView.as_view()

    def test_create(self):
        request = self.get_api_request('rating:create_ratings', self.create_data, self.user_test, self.factory.post,
                                       format='json')
        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'TR': 1}})

        rating_count = Rating.objects.filter(poll=self.availablePoll, user=self.user_test).count()
        self.assertEqual(rating_count, 1)


class UpdateRatingTestCase(RatingTestCase):
    def setUp(self):
        self.view = views.UpdateRatingsView.as_view()

        Rating.objects.create(poll=self.availablePoll, user=self.user_test, rating=FALSE)

    def test_update(self):
        request = self.get_api_request('rating:update_ratings', self.create_data, self.user_test, self.factory.patch,
                                       format='json')

        result = self.view(request)
        expected_data = {'id': 1, 'rating': TRUE, 'user': self.user_test.pk, 'poll': self.availablePoll.pk}
        self.assertDictEqual(result.data, expected_data)

        rating = Rating.objects.filter(poll=self.availablePoll, user=self.user_test)
        self.assertEqual(rating.count(), 1)
        self.assertEqual(rating.first().rating, TRUE)
