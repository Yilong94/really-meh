from rest_framework import serializers

from comment.models import Comment
from extended_user.serializers import ExtendedUserForPollSerializer


class CommentSerializer(serializers.ModelSerializer):
    creatorUser = ExtendedUserForPollSerializer()
    class Meta:
        model = Comment
        fields = ['id', 'content', 'creatorUser', 'poll', 'editedAt', 'publishedAt', 'archivedAt']


class AvailableCommentSerializer(serializers.ModelSerializer):
    userVotes = serializers.ReadOnlyField(read_only=True, source='user_votes')
    creatorUser = ExtendedUserForPollSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'creatorUser', 'poll', 'editedAt', 'publishedAt', 'userVotes']
