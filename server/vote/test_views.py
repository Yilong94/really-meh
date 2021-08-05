import datetime

from django.test import TestCase

from comment.models import Comment
from extended_user.models import ExtendedUser
from rest_framework.test import APIRequestFactory, force_authenticate
from django.urls import reverse

from poll.models import Poll
from vote import views
from vote.models import PollVote, CommentVote


class VoteTestCase(TestCase):
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


class VotePollTestCase(VoteTestCase):
    def setUp(self):
        self.view = views.PollVoteView.as_view()

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availablePoll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.datetime.now())

        PollVote.objects.create(user=self.user_test, poll=self.availablePoll, direction='UP')

        self.create_data = {
            "user": self.user_test2.pk,
            "poll": self.availablePoll.pk,
            "direction": "UP"
        }

    def test_upvote_create(self):
        request = self.get_api_request('vote:vote_poll', self.create_data, self.user_test, self.factory.post,
                                       format='json')
        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 0, 'number_of_upvotes': 2}})

        votes_count = PollVote.objects.filter(user=self.user_test2, poll=self.availablePoll, direction='UP').count()
        self.assertEqual(votes_count, 1)

    def test_downvote_update(self):
        self.test_upvote_create()

        self.create_data['direction'] = "DWN"
        request = self.get_api_request('vote:vote_poll', self.create_data, self.user_test, self.factory.post,
                                       format='json')
        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 1, 'number_of_upvotes': 1}})

        votes_count = PollVote.objects.filter(user=self.user_test2, poll=self.availablePoll, direction='DWN').count()
        self.assertEqual(votes_count, 1)

    def test_upvote_neutral(self):
        PollVote.objects.create(user=self.user_test2, poll=self.availablePoll, direction='UP')

        request = self.get_api_request('vote:vote_poll', self.create_data, self.user_test, self.factory.post,
                                       format='json')

        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 0, 'number_of_upvotes': 1}})

        votes_count = PollVote.objects.filter(user=self.user_test2, poll=self.availablePoll, direction=None).count()
        self.assertEqual(votes_count, 1)


class VoteCommentTestCase(VoteTestCase):
    def setUp(self):
        self.view = views.CommentVoteView.as_view()

        self.user_test2 = ExtendedUser.objects.create(username='some user again', email='email1@email.com')
        self.availablePoll = Poll.objects.create(title='123', content='1234', publishedAt=datetime.datetime.now())
        self.availableComment = Comment.objects.create(content='123445', poll=self.availablePoll,
                                                       publishedAt=datetime.datetime.now())

        CommentVote.objects.create(user=self.user_test, comment=self.availableComment, direction='UP')

        self.create_data = {
            "user": self.user_test2.pk,
            "comment": self.availableComment.pk,
            "direction": "UP"
        }

    def test_upvote_create(self):
        request = self.get_api_request('vote:vote_comment', self.create_data, self.user_test, self.factory.post,
                                       format='json')
        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 0, 'number_of_upvotes': 2}})

        votes_count = CommentVote.objects.filter(user=self.user_test2, comment=self.availableComment,
                                                 direction='UP').count()
        self.assertEqual(votes_count, 1)

    def test_downvote_update(self):
        self.test_upvote_create()

        self.create_data['direction'] = "DWN"
        request = self.get_api_request('vote:vote_comment', self.create_data, self.user_test, self.factory.post,
                                       format='json')
        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 1, 'number_of_upvotes': 1}})

        votes_count = CommentVote.objects.filter(user=self.user_test2, comment=self.availableComment,
                                                 direction='DWN').count()
        self.assertEqual(votes_count, 1)

    def test_upvote_neutral(self):
        CommentVote.objects.create(user=self.user_test2, comment=self.availableComment, direction='UP')

        request = self.get_api_request('vote:vote_comment', self.create_data, self.user_test, self.factory.post,
                                       format='json')

        result = self.view(request)

        self.assertDictEqual(result.data, {'data': {'number_of_downvotes': 0, 'number_of_upvotes': 1}})

        votes_count = CommentVote.objects.filter(user=self.user_test2, comment=self.availableComment,
                                                 direction=None).count()
        self.assertEqual(votes_count, 1)
