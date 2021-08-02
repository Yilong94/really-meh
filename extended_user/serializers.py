from rest_framework import serializers

from extended_user.models import ExtendedUser


class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = '__all__'


