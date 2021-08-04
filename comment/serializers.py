from datetime import datetime

from rest_framework import serializers

from comment.models import Comment
from extended_user.serializers import ExtendedUserNameIdSerializer
from vote.models import CommentVote


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'creatorUser', 'poll', 'editedAt', 'publishedAt', 'archivedAt']

    def create(self, validated_data):
        published_at = validated_data.get('publishedAt') if validated_data.get('publishedAt') else datetime.now()

        validated_data['publishedAt'] = published_at
        return super().create(validated_data)

    def update(self, instance, validated_data):
        edited_at = validated_data.get('editedAt') if validated_data.get('editedAt') else datetime.now()

        validated_data['editedAt'] = edited_at
        return super().update(instance, validated_data)


class AvailableCommentSerializer(serializers.ModelSerializer):
    userVotes = serializers.ReadOnlyField(read_only=True, source='user_votes')
    creatorUser = ExtendedUserNameIdSerializer()
    userHasVoted = serializers.SerializerMethodField(read_only=True, method_name='get_user_has_voted')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'creatorUser', 'poll', 'editedAt', 'publishedAt', 'userVotes', 'userHasVoted']

    def get_user_has_voted(self, obj):
        user_id = self.context.get("user_id")

        vote = None

        comment_vote = CommentVote.objects.filter(comment=obj, user_id=user_id).first()
        if comment_vote:
            vote = comment_vote.direction

        return vote
