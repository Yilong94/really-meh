from rest_framework import serializers

from vote.models import ThreadVote


class ThreadVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadVote
        fields = "__all__"


class CommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadVote
        fields = "__all__"
