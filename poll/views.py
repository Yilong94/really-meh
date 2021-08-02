from datetime import datetime

from django.db.models import Q
from rest_framework import generics, mixins, status
from rest_framework.response import Response

from poll.models import Poll
from poll.serializer import PollSerializer, CreatePollSerializer, UpdatePollSerializer


class PollList(generics.ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = []


class AvailablePolls(PollList):
    def get_queryset(self):
        available_cond = Q(publishedAt__isnull=False) & Q(archivedAt__isnull=True)

        search_string = self.request.query_params.get('search-string')
        if search_string:
            return self.queryset.filter(available_cond, content__contains=search_string)

        return self.queryset.filter(available_cond)


class CreatePoll(generics.CreateAPIView):
    serializer_class = CreatePollSerializer
    permission_classes = []


class UpdatePoll(generics.UpdateAPIView):
    queryset = Poll.objects.all()
    serializer_class = UpdatePollSerializer
    permission_classes = []


class DeletePoll(generics.DestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = UpdatePollSerializer
    permission_classes = []

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={'archivedAt': datetime.now()}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
