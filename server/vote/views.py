import copy

from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response

from vote.choices import UP, DOWN
from vote.models import PollVote, CommentVote
from vote.serializers import PollVoteSerializer, CommentVoteSerializer


class BaseVote(generics.GenericAPIView):
    permission_classes = []

    def get_existing_vote(self, request):
        raise NotImplementedError("get_exisiting_vote is not implemented")

    def get_related_cond(self, request):
        raise NotImplementedError("get_related_cond is not implemented")

    def create_or_update(self, data, instance=None):
        serializer = self.get_serializer(data=data, instance=instance)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    def post(self, request, *args, **kwargs):
        create_or_update_data = copy.deepcopy(request.data)

        direction = request.data.get('direction')
        existing_vote = self.get_existing_vote(request)

        if existing_vote and direction == existing_vote.direction:
            create_or_update_data['direction'] = None

        self.create_or_update(create_or_update_data, existing_vote)

        vote_relation_cond = self.get_related_cond(request)

        number_of_upvotes = self.queryset.filter(vote_relation_cond, direction=UP).count()
        number_of_downvotes = self.queryset.filter(vote_relation_cond, direction=DOWN).count()

        data = {
            "number_of_upvotes": number_of_upvotes,
            "number_of_downvotes": number_of_downvotes
        }

        return Response({"data": data}, status=status.HTTP_200_OK)


class PollVoteView(BaseVote):
    serializer_class = PollVoteSerializer
    queryset = PollVote.objects.all()

    def get_existing_vote(self, request):
        user = request.data.get('user')
        poll = request.data.get('poll')
        return self.queryset.filter(poll=poll, user=user).first()

    def get_related_cond(self, request):
        poll = request.data.get('poll')
        return Q(poll=poll)


class CommentVoteView(BaseVote):
    serializer_class = CommentVoteSerializer
    queryset = CommentVote.objects.all()

    def get_existing_vote(self, request):
        user = request.data.get('user')
        comment = request.data.get('comment')
        return self.queryset.filter(comment=comment, user=user).first()

    def get_related_cond(self, request):
        comment = request.data.get('comment')
        return Q(comment=comment)
