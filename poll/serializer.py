from rest_framework import serializers

from extended_user.serializers import ExtendedUserSerializer
from poll.models import Poll


class PollSerializer(serializers.ModelSerializer):
    ratings = ExtendedUserSerializer(many=True)
    votes = ExtendedUserSerializer(many=True)

    class Meta:
        model = Poll
        fields = "__all__"


class AvailablePollSerializer(serializers.ModelSerializer):
    user_ratings = serializers.ReadOnlyField(read_only=True)
    number_of_user_comments = serializers.ReadOnlyField(read_only=True)
    user_has_rated = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Poll
        fields = ['title', 'content', 'creatorUser', 'archivedAt', 'publishedAt', 'editedAt', 'user_ratings',
                  'number_of_user_comments', 'user_has_rated']

    def get_user_has_rated(self, obj):
        user_id = self.context.get("user_id")

        return obj.ratings.filter(id=user_id).exists()


class CreatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['title', 'content', 'creatorUser']


class UpdatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['title', 'content', 'archivedAt', 'publishedAt', 'editedAt']

