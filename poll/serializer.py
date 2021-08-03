from rest_framework import serializers

from extended_user.serializers import ExtendedUserSerializer
from poll.models import Poll


class PollSerializer(serializers.ModelSerializer):
    ratings = ExtendedUserSerializer(many=True)
    votes = ExtendedUserSerializer(many=True)

    class Meta:
        model = Poll
        fields = "__all__"


class CreatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['content', 'creatorUser']


class UpdatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['content', 'archivedAt', 'publishedAt', 'editedAt']

