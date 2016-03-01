from django.conf import settings
from django.conf.urls import include, static, url
from django.contrib import admin


urlpatterns = [

    url(r'^admin/', include(admin.site.urls)),

    url(r'^', include('workmate.urls')),

]

if settings.DEBUG:
    urlpatterns += static.static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
