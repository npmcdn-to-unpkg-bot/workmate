# -*- coding: utf-8 -*-
from django.conf import settings


GRADWELL_URL = 'https://call-api.gradwell.com/0.9.3/call?auth={}&extension={}&destination={}'

WORKMATE_CALL_GATEWAY = getattr(settings, 'WORKMATE_CALL_GATEWAY', 'workmate.gateways.gradwell.gateway.Gradwell')
WORKMATE_PAGINATE_BY = getattr(settings, 'WORKMATE_PAGINATE_BY', 15)
