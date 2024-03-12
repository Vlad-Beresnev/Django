from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.
# This code defines a new API endpoint that returns a JSON response with a message.
@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})
