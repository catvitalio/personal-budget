from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from apps.users.serializers import UserSerializer


class UserViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer


class AuthViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return ObtainAuthToken().post(self.request)
