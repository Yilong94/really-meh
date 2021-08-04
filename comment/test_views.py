from datetime import datetime

from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIRequestFactory, force_authenticate
# Create your tests here.
from comment import views
from comment.models import Comment
from comment.serializers import AvailableCommentSerializer, CommentSerializer
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

        cls.available_poll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.now())

        cls.today = datetime(2021, 8, 4, 18, 00)
        cls.create_data = {
            "content": 'abcdef',
            "creatorUser": cls.user_test.pk,
            "poll": cls.available_poll.pk,
            "publishedAt": cls.today
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


class AvailableCommentsTestCase(CommentTestCase):
    def setUp(self):
        self.view = views.AvailableComments.as_view()

    def test_get(self):
        comment = Comment.objects.create(content='abc', creatorUser=self.user_test, poll=self.available_poll,
                                         publishedAt=datetime.now())

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
        request = self.get_api_request('comment:create_comment', self.create_data, self.user_test, self.factory.post,
                                       format='json')

        response = self.view(request)

        query = Comment.objects.filter(creatorUser=self.user_test, poll=self.available_poll)

        comment_count = query.count()
        self.assertEqual(comment_count, 1)

        the_comment = query.first()
        expected_data = CommentSerializer(instance=the_comment).data

        self.assertDictEqual(response.data, expected_data)


class UpdateCommentsTestCase(CommentTestCase):
    def setUp(self):
        self.view = views.UpdateComment.as_view()

    def test_update(self):
        comment = Comment.objects.create(content='abc', creatorUser=self.user_test, poll=self.available_poll,
                                         publishedAt=datetime.now())

        self.create_data['content'] = "I'm updated!"

        response = self.view_helper('comment:update_comment', comment.pk, self.create_data, self.factory.put, self.view)

        comment.refresh_from_db()
        expected_data = CommentSerializer(instance=comment).data
        self.assertDictEqual(response.data, expected_data)
