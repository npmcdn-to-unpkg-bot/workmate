# -*- coding: utf-8 -*-
from django.conf import settings


WORKMATE_PAGINATE_BY = getattr(settings, 'WORKMATE_PAGINATE_BY', 25)
