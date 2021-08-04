from datetime import datetime

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIRequestFactory, force_authenticate
# Create your tests here.
from comment import views
from comment.models import Comment
from comment.serializers import AvailableCommentSerializer
from extended_user.models import ExtendedUser
from poll.models import Poll
from vote.choices import UP
from vote.models import CommentVote


class CommentTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='some user', email='email@email.com')
        cls.user_test.set_password('1234')
        cls.user_test.is_superuser = True
        cls.user_test.save()

        cls.factory = APIRequestFactory()

        cls.availablePoll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.now())

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


class AvailableCommentsTestCase(CommentTestCase):
    def setUp(self):
        self.view = views.AvailableComments.as_view()

    def test_get(self):
        comment = Comment.objects.create(content='abc', creatorUser=self.user_test, poll=self.availablePoll, publishedAt=datetime.now())

        user_test = ExtendedUser.objects.create(username='some user 1', email='email1@email.com')

        CommentVote.objects.create(user=self.user_test, comment=comment, direction=UP)
        CommentVote.objects.create(user=user_test, comment=comment, direction=UP)

        request = self.get_api_request('comment:available_comments', {}, self.user_test, self.factory.get,
                                       format='json')

        response = self.view(request)
        dict_response_data = dict(response.data)
        self.assertEqual(len(dict_response_data['results']), 1)
        expected_data = AvailableCommentSerializer(comment)
        self.assertDictEqual(dict_response_data['results'][0], expected_data.data)


class CreateCommentsTestCase(CommentTestCase):
    def setUp(self):
        self.view = views.CreateComment.as_view()

    def test_create(self):
        request = self.get_api_request('comment:create_comment', {}, self.user_test, self.factory.get,
                                       format='json')

        response = self.view(request)

