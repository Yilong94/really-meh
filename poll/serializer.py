import datetime

from rest_framework import serializers

from extended_user.serializers import ExtendedUserSerializer
from poll.models import Poll
from rating.models import Rating


class PollSerializer(serializers.ModelSerializer):
    ratings = ExtendedUserSerializer(many=True)
    votes = ExtendedUserSerializer(many=True)

    class Meta:
        model = Poll
        fields = "__all__"


class AvailablePollSerializer(serializers.ModelSerializer):
    userRatings = serializers.ReadOnlyField(read_only=True, source='user_ratings')
    numberOfUserComments = serializers.ReadOnlyField(read_only=True, source='number_of_user_comments')
    userHasRated = serializers.SerializerMethodField(read_only=True, method_name='get_user_has_rated')

    class Meta:
        model = Poll
        fields = ['id', 'title', 'content', 'creatorUser', 'archivedAt', 'publishedAt', 'editedAt', 'userRatings',
                  'numberOfUserComments', 'userHasRated']

    def get_user_has_rated(self, obj):
        user_id = self.context.get("user_id")

        rating = None

        poll_rating = Rating.objects.filter(poll=obj, user_id=user_id).first()
        if poll_rating:
            rating = poll_rating.rating

        return rating


class CreatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['title', 'content', 'creatorUser', 'publishedAt']

    def create(self, validated_data):
        published_at = validated_data.get('publishedAt') if validated_data.get('publishedAt') else datetime.datetime.now()

        validated_data['publishedAt'] = published_at
        return super().create(validated_data)


class UpdatePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['title', 'content', 'publishedAt', 'editedAt']


class DeletePollSerializer(PollSerializer):
    class Meta:
        model = Poll
        fields = ['archivedAt']
