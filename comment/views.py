from django.db.models import Q

from rest_framework import generics

from comment.models import Comment
from comment.serializers import AvailableCommentSerializer, CommentSerializer
from utils.pagination import SmallResultsSetPagination


class AvailableComments(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = AvailableCommentSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = []

    def get_queryset(self):
        poll_id = self.request.query_params.get('poll-id')

        available_cond = Q(publishedAt__isnull=False) & Q(archivedAt__isnull=True)
        if poll_id:
            available_cond &= Q(poll__id=poll_id)

        return self.queryset.filter(available_cond)


class CreateComment(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = []


class UpdateComment(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = []

