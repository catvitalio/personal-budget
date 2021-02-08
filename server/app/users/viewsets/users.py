from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer

from users.serializers import UserSerializer
from users.viewsets.custom import CustomObtainAuthToken


class UserViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer


class AuthViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return CustomObtainAuthToken().post(request)
