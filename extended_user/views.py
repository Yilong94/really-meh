from rest_framework import generics, status
from rest_framework.response import Response

from extended_user.models import ExtendedUser
from extended_user.serializers import UserSignUpSerializer, UserLoginSerializer


class UserSignUp(generics.CreateAPIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = UserSignUpSerializer
    permission_classes = []


class UserLogin(generics.GenericAPIView):
    queryset = ExtendedUser.objects.all()
    serializer_class = UserLoginSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        user = serializer.validate_user()

        return Response(data={"user": user}, status=status.HTTP_200_OK)
