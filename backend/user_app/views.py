from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

class Register(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = email
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        new_user = User.objects.create_user(
            username = username,
            email = email,
            password = password,
            first_name = first_name,
            last_name = last_name,
        )
        token = Token.objects.create(user = new_user)
        return Response({
            "user":new_user.email,
            "token":token.key,
            "username":new_user.username,
            "first_name":new_user.first_name,
            "last_name":new_user.last_name,
        }, status=HTTP_201_CREATED)


class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = {
            "id":request.user.id,
            "username":request.user.username,
            "email":request.user.email,
            "first_name":request.user.first_name,
            "last_name":request.user.last_name,
        }
        print(user_data)
        return Response(user_data)
    
class Login(APIView):
    def post(self, request):
        username = request.data.get("email")
        password = request.data.get("password")
        print(username, password)
        user = authenticate(username = username, password=password)
        print("user id is: ", user.id)
        if user:
            token, created = Token.objects.get_or_create(user = user)
            print(token.key)
            return Response({
                "token":token.key,
                "id":user.id,
                "username":user.username,
                "first_name":user.first_name,
                "last_name":user.last_name,
             })
        else:
            return Response("INVALID CREDENTIALS", HTTP_404_NOT_FOUND)
        
class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)