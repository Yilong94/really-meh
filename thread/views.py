from datetime import datetime

from django.db.models import Q
from rest_framework import generics, mixins, status
from rest_framework.response import Response

from thread.models import Thread
from thread.serializer import ThreadSerializer, CreateThreadSerializer, UpdateThreadSerializer


class ThreadList(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = []


class AvailableThreads(ThreadList):
    def get_queryset(self):
        available_cond = Q(publishedAt__isnull=False) & Q(archivedAt__isnull=True)

        search_string = self.request.query_params.get('search-string')
        if search_string:
            return self.queryset.filter(available_cond, content__contains=search_string)

        return self.queryset.filter(available_cond)


class CreateThread(generics.CreateAPIView):
    serializer_class = CreateThreadSerializer
    permission_classes = []


class UpdateThread(generics.UpdateAPIView):
    queryset = Thread.objects.all()
    serializer_class = UpdateThreadSerializer
    permission_classes = []


class DeleteThread(generics.DestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = UpdateThreadSerializer
    permission_classes = []

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data={'archivedAt': datetime.now()}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
