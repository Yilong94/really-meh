from rest_framework import serializers

from extended_user.serializers import ExtendedUserSerializer
from thread.models import Thread


class ThreadSerializer(serializers.ModelSerializer):
    ratings = ExtendedUserSerializer(many=True)
    votes = ExtendedUserSerializer(many=True)

    class Meta:
        model = Thread
        fields = "__all__"


class CreateThreadSerializer(ThreadSerializer):
    class Meta:
        model = Thread
        fields = ['content', 'creatorUser']


class UpdateThreadSerializer(ThreadSerializer):
    class Meta:
        model = Thread
        fields = ['content', 'archivedAt', 'publishedAt', 'editedAt']

