#####
Setup
#####

Add the following apps to the ``INSTALLED_APPS``::

    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.sites',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        ...
        'adminsortable2',
        'bootstrap3',
        'reversion',
        'tastypie',
        'workmate',
        ...
    )

Ensure you are using valid auth urls::

    LOGIN_URL = '/login/'
    LOGIN_REDIRECT_URL = '/'
    LOGOUT_URL = '/logout/'

Add the middleware::

    MIDDLEWARE_CLASSES = (
        ...
        'reversion.middleware.RevisionMiddleware',
        'workmate.middleware.current_user.CurrentUserMiddleware',
        'workmate.middleware.site_setup.SiteSettingMiddleware',
    )

Add the context processors::

    TEMPLATES = [
        {
            ...
            'OPTIONS': {
                'context_processors': [
                    ...
                    'workmate.context_processors.workmate_settings',
                ],
            },
        },
    ]

Workmate does not install or use packages that tastypie requires for xml, good practice says disable it via
the appropriate setting:

    TASTYPIE_DEFAULT_FORMATS = ['json']

This project requires all the auth urls, the below is from the example project and uses the admin templates for ease.
Customize as you feel fit.

Add the url routes to the project in urls.py::

    urlpatterns = [

        ...

        url(r'^login/$', login, {'template_name': 'admin/login.html'}, name='login'),
        url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
        url(r'^password_change/$', password_change, name='password_change'),
        url(r'^password_change/done/$', password_change_done, name='password_change_done'),
        url(r'^password_reset/$', password_reset, name='admin_password_reset'),
        url(r'^password_reset/done/$', password_reset_done, name='password_reset_done'),
        url(r'^reset/(?P<token>.+)-(?P<uidb64>[0-9A-Za-z]+)/$', password_reset_confirm, name='password_reset_confirm'),
        url(r'^reset/done/$', password_reset_complete, name='password_reset_complete'),

        ...

        url(r'^admin/', include(admin.site.urls)),

        ...

        url(r'^', include('workmate.urls')),

        ...

    ]


