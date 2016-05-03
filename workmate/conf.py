# -*- coding: utf-8 -*-
from django.conf import settings

from appconf import AppConf


class WorkmateAppConf(AppConf):
    CALL_GATEWAY = getattr(settings, 'WORKMATE_CALL_GATEWAY', 'workmate.gateways.gradwell.gateway.Gradwell')
    GRADWELL_URL = 'https://call-api.gradwell.com/0.9.3/call?auth={}&extension={}&destination={}'
    PAGINATE_BY = getattr(settings, 'WORKMATE_PAGINATE_BY', 15)

    class Meta:
        prefix = 'workmate'
