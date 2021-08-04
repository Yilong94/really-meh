from rest_framework import serializers

from comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class AvailableCommentSerializer(serializers.ModelSerializer):
    userVotes = serializers.ReadOnlyField(read_only=True, source='user_votes')

    class Meta:
        model = Comment
        fields = ['id', 'creatorUser', 'poll', 'editedAt', 'publishedAt', 'userVotes']
