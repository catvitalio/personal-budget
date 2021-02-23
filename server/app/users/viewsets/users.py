from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth.models import User

from users.serializers import UserSerializer
from users.viewsets.custom import CustomObtainAuthToken
from users.permissions import UserPermission


class UserViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    permission_classes = [UserPermission]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class AuthViewSet(ViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request):
        return CustomObtainAuthToken().post(request)
