from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from extended_user.models import ExtendedUser


class ExtendedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = '__all__'


class ExtendedUserNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedUser
        fields = ['id', 'name']


class UserSignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=ExtendedUser.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = ExtendedUser
        fields = ['username', 'password', 'password2', 'email', 'name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = ExtendedUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ['username', 'password']

    def validate_user(self):
        user = None

        attrs_are_valid = self.is_valid(raise_exception=True)
        if attrs_are_valid:
            username = self.validated_data.get('username')
            password = self.validated_data.get('password')

            user = authenticate(username=username, password=password)

        if user:
            return ExtendedUserNameIdSerializer(instance=user).data
        else:
            return None

