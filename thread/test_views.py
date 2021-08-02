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
from thread import views
from thread.models import Thread
from thread.serializer import ThreadSerializer, CreateThreadSerializer, UpdateThreadSerializer
from vote.models import ThreadVote


class ThreadTestCase(TestCase):
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


class AvailableThreadTestCase(ThreadTestCase):
    def setUp(self):
        self.view = views.AvailableThreads.as_view()
        self.archivedThread = Thread.objects.create(content="I'm archived", publishedAt=datetime.now(),
                                                    archivedAt=datetime.now())
        self.availableThread = Thread.objects.create(content="I'm available", publishedAt=datetime.now())

    def test_get_available(self):
        request = self.get_api_request('thread:threads', {}, self.user_test, self.factory.get, format='json')

        response = self.view(request)

        serializer = ThreadSerializer(self.availableThread)
        expected_data = serializer.data

        self.assertEqual(len(response.data), 1)
        self.assertDictEqual(expected_data, response.data[0])

    def test_nothing_available(self):
        self.availableThread.delete()

        request = self.get_api_request('thread:threads', {}, self.user_test, self.factory.get, format='json')

        response = self.view(request)
        self.assertEqual(len(response.data), 0)

    def test_search_available(self):
        self.availableThread2 = Thread.objects.create(content="I'm available too", publishedAt=datetime.now())
        self.availableThread3 = Thread.objects.create(content="I'm available too too too", publishedAt=datetime.now())
        self.availableThread4 = Thread.objects.create(content="I have nothing", publishedAt=datetime.now())

        request = self.get_api_request('thread:threads', {'search-string': 'available'}, self.user_test,
                                       self.factory.get, format='json')

        response = self.view(request)

        expected_threads = [self.availableThread, self.availableThread2, self.availableThread3]
        for index, thread in enumerate(response.data):
            serializer = ThreadSerializer(expected_threads[index])
            self.assertDictEqual(serializer.data, thread)


class CreateThreadTestCase(ThreadTestCase):
    def setUp(self):
        self.view = views.CreateThread.as_view()

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availableThread = Thread.objects.create(content="I'm available", publishedAt=datetime.now(),
                                                     creatorUser=self.user_test2)

        # self.rating1 = Rating.objects.create(user=self.user_test, thread=self.availableThread, rating=Rating.TRUE)
        # self.rating2 = Rating.objects.create(user=self.user_test2, thread=self.availableThread, rating=Rating.FALSE)
        #
        # self.vote1 = ThreadVote.objects.create(user=self.user_test, thread=self.availableThread)

    def test_create(self):
        serializer = CreateThreadSerializer(self.availableThread)
        create_data = serializer.data

        new_content = "I'm the created thread!"
        create_data['content'] = new_content

        request = self.get_api_request('thread:threads', create_data, self.user_test, self.factory.post, format='json')

        self.view(request)

        created_thread = Thread.objects.filter(content=new_content).count()
        self.assertEqual(created_thread, 1)


class UpdateThreadTestCase(ThreadTestCase):
    def setUp(self):
        self.view = views.UpdateThread.as_view()

        self.today = datetime(2021, 8, 2, 18, 00)

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availableThread = Thread.objects.create(content="I'm available", publishedAt=self.today,
                                                     creatorUser=self.user_test2)

    def test_update(self):
        serializer = UpdateThreadSerializer(self.availableThread)
        update_data = serializer.data

        tomorrow = self.today + timedelta(days=1)

        new_content = "I'm the updated thread!"
        update_data.pop('id', {})
        update_data['content'] = new_content
        update_data['archivedAt'] = tomorrow
        update_data['editedAt'] = tomorrow

        self.view_helper('thread:threads', self.availableThread.pk, update_data, self.factory.put, self.view)

        created_thread = Thread.objects.filter(archivedAt=tomorrow, editedAt=tomorrow, content=new_content).count()
        self.assertEqual(created_thread, 1)


class DeleteThreadTestCase(ThreadTestCase):
    def setUp(self):
        self.view = views.DeleteThread.as_view()

        self.today = datetime(2021, 8, 2, 18, 00)
        self.content = "I'm available to be deleted"
        self.availableThread = Thread.objects.create(content=self.content, publishedAt=self.today)

    def test_delete(self):
        datetime_mock = Mock(wraps=datetime)
        datetime_mock.now.return_value = self.today
        with mock.patch('thread.views.datetime', datetime_mock):
            self.view_helper('thread:threads', self.availableThread.pk, {}, self.factory.delete, self.view)

        thread_count = Thread.objects.filter(content=self.content, archivedAt=self.today).count()
        self.assertEqual(thread_count, 1)


