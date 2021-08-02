import datetime

from django.test import TestCase
from extended_user.models import ExtendedUser
from rest_framework.test import APIRequestFactory, force_authenticate
from django.urls import reverse

from poll.models import Poll
from vote import views
from vote.models import Vote, PollVote
from vote.serializers import PollVoteSerializer


class PollVoteTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='some user', email='email@email.com')
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
        request = self.get_api_request(url, data, self.user_test, function, format='json',
                                       reverse_kwargs=reverse_kwargs)
        response = view(request, pk=pk)
        return response


class UpVotePollTestCase(PollVoteTestCase):
    def setUp(self):
        self.view = views.UpVotePoll.as_view()

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availablePoll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.datetime.now())

    def test_upvote(self):
        create_data = {
            "user": self.user_test2.pk,
            "poll": self.availablePoll.pk,
        }

        request = self.get_api_request('poll:polls', create_data, self.user_test, self.factory.post, format='json')

        self.view(request)

        votes_count = PollVote.objects.filter(user=self.user_test2, poll=self.availablePoll).count()
        self.assertEqual(votes_count, 1)



