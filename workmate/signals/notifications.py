import logging
from json import dumps

from channels import Group


logger = logging.getLogger(__name__)


def send_notification(notification):
    Group('data_notifications').send({'text': dumps(notification)})


def post_delete_notification(sender, **kwargs):
    instance = kwargs['instance']
    send_notification({
        'model': instance.__class__.__name__,
        'pk': instance.pk,
        'type': 'post_delete'
    })


def post_save_notification(sender, **kwargs):
    instance = kwargs['instance']
    send_notification({
        'model': instance.__class__.__name__,
        'pk': instance.pk,
        'type': 'post_save',
        'created': kwargs['created']
    })
