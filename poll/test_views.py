import json

from datetime import datetime, timedelta
from unittest import mock
from unittest.mock import Mock

from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory, force_authenticate

# Create your tests here.
from extended_user.models import ExtendedUser
from rating.models import Rating
from poll import views
from poll.models import Poll
from poll.serializer import PollSerializer, CreatePollSerializer, UpdatePollSerializer, AvailablePollSerializer
from vote.models import PollVote


class PollTestCase(TestCase):
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
        request = self.get_api_request(url, data, self.user_test, function, format='json', reverse_kwargs=reverse_kwargs)
        response = view(request, pk=pk)
        return response


class AvailablePollTestCase(PollTestCase):
    def setUp(self):
        self.view = views.AvailablePolls.as_view()
        self.archivedPoll = Poll.objects.create(content="I'm archived", publishedAt=datetime.now(),
                                                archivedAt=datetime.now())
        self.availablePoll = Poll.objects.create(content="I'm available", publishedAt=datetime.now())

    def test_get_available(self):
        request = self.get_api_request('poll:polls', {}, self.user_test, self.factory.get, format='json')

        response = self.view(request)

        serializer = AvailablePollSerializer(self.availablePoll)
        expected_data = serializer.data

        dict_response_data = dict(response.data)
        self.assertEqual(len(dict_response_data['results']), 1)
        self.assertDictEqual(expected_data, dict_response_data['results'][0])

    def test_nothing_available(self):
        self.availablePoll.delete()

        request = self.get_api_request('poll:polls', {}, self.user_test, self.factory.get, format='json')

        response = self.view(request)
        dict_response_data = dict(response.data)
        self.assertEqual(len(dict_response_data['results']), 0)

    def test_search_available(self):
        self.availablePoll2 = Poll.objects.create(content="I'm available too", publishedAt=datetime.now())
        self.availablePoll3 = Poll.objects.create(content="I'm available too too too", publishedAt=datetime.now())
        self.availablePoll4 = Poll.objects.create(content="I have nothing", publishedAt=datetime.now())

        request = self.get_api_request('poll:polls', {'search-string': 'available'}, self.user_test,
                                       self.factory.get, format='json')

        response = self.view(request)
        dict_response_data = dict(response.data)

        expected_polls = [self.availablePoll, self.availablePoll2, self.availablePoll3]
        for index, poll in enumerate(dict_response_data['results']):
            serializer = AvailablePollSerializer(expected_polls[index])
            self.assertDictEqual(serializer.data, poll)


class CreatePollTestCase(PollTestCase):
    def setUp(self):
        self.view = views.CreatePoll.as_view()

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availablePoll = Poll.objects.create(content="I'm available", publishedAt=datetime.now(),
                                                 creatorUser=self.user_test2)

    def test_create(self):
        serializer = CreatePollSerializer(self.availablePoll)
        create_data = serializer.data

        new_content = "I'm the created poll!"
        create_data['content'] = new_content

        request = self.get_api_request('poll:polls', create_data, self.user_test, self.factory.post, format='json')

        self.view(request)

        created_poll = Poll.objects.filter(content=new_content).count()
        self.assertEqual(created_poll, 1)


class UpdatePollTestCase(PollTestCase):
    def setUp(self):
        self.view = views.UpdatePoll.as_view()

        self.today = datetime(2021, 8, 2, 18, 00)

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availablePoll = Poll.objects.create(content="I'm available", publishedAt=self.today,
                                                 creatorUser=self.user_test2)

    def test_update(self):
        serializer = UpdatePollSerializer(self.availablePoll)
        update_data = serializer.data

        tomorrow = self.today + timedelta(days=1)

        new_content = "I'm the updated poll!"
        update_data.pop('id', {})
        update_data['content'] = new_content
        update_data['archivedAt'] = tomorrow
        update_data['editedAt'] = tomorrow

        self.view_helper('poll:polls', self.availablePoll.pk, update_data, self.factory.put, self.view)

        created_poll = Poll.objects.filter(archivedAt=tomorrow, editedAt=tomorrow, content=new_content).count()
        self.assertEqual(created_poll, 1)


class DeletePollTestCase(PollTestCase):
    def setUp(self):
        self.view = views.DeletePoll.as_view()

        self.today = datetime(2021, 8, 2, 18, 00)
        self.content = "I'm available to be deleted"
        self.availablePoll = Poll.objects.create(content=self.content, publishedAt=self.today)

    def test_delete(self):
        datetime_mock = Mock(wraps=datetime)
        datetime_mock.now.return_value = self.today
        with mock.patch('poll.views.datetime', datetime_mock):
            self.view_helper('poll:polls', self.availablePoll.pk, {}, self.factory.delete, self.view)

        poll_count = Poll.objects.filter(content=self.content, archivedAt=self.today).count()
        self.assertEqual(poll_count, 1)


