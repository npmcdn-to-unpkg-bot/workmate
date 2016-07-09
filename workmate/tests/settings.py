import os


BASE_DIR = os.path.dirname(__file__)

SECRET_KEY = 'SOME SECRET KEY THAT NEEDS CHANGING'

DEBUG = True

ALLOWED_HOSTS = ['*']

INTERNAL_IPS = ('127.0.0.1', )


# Application definition
SITE_ID = 1

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_URL = '/logout/'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'adminsortable2',
    'bootstrap3',
    'reversion',
    'tastypie',
    'workmate',
]


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'reversion.middleware.RevisionMiddleware',
    'workmate.middleware.current_user.CurrentUserMiddleware',
    'workmate.middleware.site_setup.SiteSettingMiddleware',
)

ROOT_URLCONF = 'workmate.tests.urls'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
    }
}


STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'collected_static')

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
                'workmate.context_processors.workmate_settings',

            ],
        },
    },
]


AUTH_USER_MODEL = os.environ.get('AUTH_USER_MODEL', 'auth.User')


TASTYPIE_DEFAULT_FORMATS = ['json']
