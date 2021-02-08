from django.contrib import admin
from django.urls import include, path

from api.routers import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
