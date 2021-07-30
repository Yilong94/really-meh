from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.response import Response

from thread.models import Thread
from thread.serializer import ThreadSerializer


class ThreadList(generics.ListAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = []

