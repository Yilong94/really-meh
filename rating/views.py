from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response

from rating.models import Rating
from rating.serializers import RatingSerializer


class CreateRatingsView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    def post(self, request, *args, **kwargs):
        instance = self.create(request, *args, **kwargs)

        poll_ratings = instance.poll.user_ratings
        return Response({"data": poll_ratings}, status=status.HTTP_201_CREATED)


class UpdateRatingsView(generics.UpdateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = []

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        user = self.request.data.get('user')
        poll = self.request.data.get('poll')
        obj = get_object_or_404(queryset, user=user, poll=poll)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


