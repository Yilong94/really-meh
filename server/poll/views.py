from datetime import datetime

from django.db.models import Q, Case, When, Value, BooleanField
from rest_framework import generics, mixins, status
from rest_framework.response import Response

from poll.models import Poll
from poll.serializer import CreatePollSerializer, UpdatePollSerializer, AvailablePollSerializer, DeletePollSerializer
from utils.pagination import SmallResultsSetPagination
from similarity_engine.similarity_engine import SimilarityEngine


class AvailablePolls(generics.ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = AvailablePollSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = []

    similarity_engine = SimilarityEngine()

    user_id = None

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, **kwargs, context={'user_id': self.user_id})

    def get_similar_polls_cond(self, queryset, search_string):
        mapper = queryset.values('id', 'content')

        corpus = [mapped_obj['content'] for mapped_obj in mapper]

        similar_contents_index = self.similarity_engine.run(search_string, corpus)

        if similar_contents_index and len(similar_contents_index) > 0:
            return Q(id__in=[mapper[index]['id'] for index in similar_contents_index])
        else:
            return Q()

    def get_queryset(self):
        search_string = self.request.query_params.get('search-string')
        poll_id = self.request.query_params.get('poll-id')

        available_cond = Q(publishedAt__isnull=False) & Q(archivedAt__isnull=True)
        if search_string:
            query_set = self.queryset.filter(available_cond)
            available_cond &= self.get_similar_polls_cond(query_set, search_string)

        if poll_id:
            available_cond &= Q(id=poll_id)

        return self.queryset.filter(available_cond)

    def list(self, request, *args, **kwargs):
        user_id = self.request.query_params.get('user-id')
        if not user_id:
            return Response(data={"message": "user-id not supplied"}, status=status.HTTP_400_BAD_REQUEST)

        self.user_id = user_id

        return super().list(request, *args, **kwargs)


class CreatePoll(generics.CreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = CreatePollSerializer
    permission_classes = []


class UpdatePoll(generics.UpdateAPIView):
    queryset = Poll.objects.all()
    serializer_class = UpdatePollSerializer
    permission_classes = []


class DeletePoll(generics.DestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = DeletePollSerializer
    permission_classes = []

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={'archivedAt': datetime.now()}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
