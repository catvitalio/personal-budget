from django.urls import path
from django.urls import include

from api.routers import router
from users.views import CustomAuthToken

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', CustomAuthToken.as_view())
]
