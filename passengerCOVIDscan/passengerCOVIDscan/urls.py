"""passengerCOVIDscan URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Passengers import views as v
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',v.home),
    path('team/', v.team),
    path('about/', v.about),
    path('IDs_scan', v.IDs_scan),
    path('glove_scan/', v.glove_scan),
    path('mask_scan/', v.mask_scan),
    path('demo/', v.demo),
    path('badge/', v.badge_decode),
    path('predict_ppe/', v.predict_ppe),
    path('predict_glove',v.predict_glove),
    path('admin/', admin.site.urls),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
