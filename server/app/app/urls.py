from django.contrib import admin
from django.urls import include, path

from api.routers import router
from users.views import CustomAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
