from datetime import datetime

from django.test import TestCase

from extended_user.models import ExtendedUser
from poll.models import Poll
from rating.choices import TRUE, FALSE, SOMEWHAT_TRUE
from rating.models import Rating


class PollTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_test = ExtendedUser(username='some user', email='email@email.com')
        cls.user_test.set_password('1234')
        cls.user_test.is_superuser = True
        cls.user_test.save()

        cls.user1 = ExtendedUser.objects.create(username='some user1', email='email1@email.com')
        cls.user2 = ExtendedUser.objects.create(username='some user2', email='email2@email.com')
        cls.user3 = ExtendedUser.objects.create(username='some user3', email='email3@email.com')

    def setUp(self):
        self.availablePoll = Poll.objects.create(content="I'm available", publishedAt=datetime.now())

        self.rating1 = Rating.objects.create(poll=self.availablePoll, user=self.user_test, rating=TRUE)
        self.rating1 = Rating.objects.create(poll=self.availablePoll, user=self.user1, rating=SOMEWHAT_TRUE)
        self.rating1 = Rating.objects.create(poll=self.availablePoll, user=self.user2, rating=FALSE)
        self.rating1 = Rating.objects.create(poll=self.availablePoll, user=self.user3, rating=SOMEWHAT_TRUE)

    def test_user_rating_property(self):
        user_ratings = self.availablePoll.user_ratings

        expected_user_ratings = {'FSE': 1, 'SW_TR': 2, 'TR': 1}

        self.assertDictEqual(user_ratings, expected_user_ratings)

