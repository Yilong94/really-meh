from django.db.models import Q

from rest_framework import generics, status
from rest_framework.response import Response

from comment.models import Comment
from comment.serializers import AvailableCommentSerializer, CommentSerializer
from utils.pagination import SmallResultsSetPagination


class AvailableComments(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = AvailableCommentSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = []

    user_id = None

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs, context={'user_id': self.user_id})

    def get_queryset(self):
        poll_id = self.request.query_params.get('poll-id')

        available_cond = Q(publishedAt__isnull=False) & Q(archivedAt__isnull=True)
        if poll_id:
            available_cond &= Q(poll__id=poll_id)

        return self.queryset.filter(available_cond)

    def list(self, request, *args, **kwargs):
        user_id = self.request.query_params.get('user-id')
        if not user_id:
            return Response(data={"message": "user-id not supplied"}, status=status.HTTP_400_BAD_REQUEST)

        self.user_id = user_id

        return super().list(request, *args, **kwargs)


class CreateComment(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = []


class UpdateComment(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = []

