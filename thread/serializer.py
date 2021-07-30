from rest_framework import serializers

from rating.serializers import RatingSerializer
from thread.models import Thread
from vote.serializers import ThreadVoteSerializer


class ThreadSerializer(serializers.ModelSerializer):
    ratings = RatingSerializer(many=True)
    votes = ThreadVoteSerializer(many=True)

    class Meta:
        model = Thread
        fields = "__all__"
