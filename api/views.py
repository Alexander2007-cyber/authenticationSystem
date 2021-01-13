from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as log_out
from django.conf import settings
from django.http import HttpResponseRedirect
from urllib.parse import urlencode
import json

class Authenticated(APIView):
    def get(self, request, format=None):
        user = request.user
        if user.is_authenticated:
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status=status.HTTP_200_OK)

class User(APIView):
    def get(self, request, format=None):
        try:
            user = request.user
            auth0user = user.social_auth.get(provider='auth0')
            userdata = {
                'user_id': auth0user.uid,
                'name': user.first_name,
                'picture': auth0user.extra_data['picture'],
                'email': auth0user.extra_data['email'],
                'data': auth0user.extra_data
            }
            return Response(userdata, status=status.HTTP_200_OK)
        except:
            return Response('User is not authenticated', status=status.HTTP_400_BAD_REQUEST)

class GetLoginUrl(APIView):
    def get(self, request, format=None):
        url = {
            'path': 'http://127.0.0.1:8000/login/auth0'
        }
        return Response(url, status=status.HTTP_200_OK)


def logout(request):
    log_out(request)
    return_to = urlencode({'returnTo': request.build_absolute_uri('/')})
    logout_url = 'https://%s/v2/logout?client_id=%s&%s' % \
                 (settings.SOCIAL_AUTH_AUTH0_DOMAIN, settings.SOCIAL_AUTH_AUTH0_KEY, return_to)
    return HttpResponseRedirect(logout_url)

class GetLogoutUrl(APIView):
    def get(self, request):
        url = {
            'path': 'http://127.0.0.1:8000/logout'
        }
        return Response(url, status=status.HTTP_200_OK)