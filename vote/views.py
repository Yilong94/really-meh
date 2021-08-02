from rest_framework import generics, mixins, status
from vote.models import PollVote
from vote.serializers import PollVoteSerializer


class UpVotePoll(generics.CreateAPIView):
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    permission_classes = []

