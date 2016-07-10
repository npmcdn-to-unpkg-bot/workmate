import logging

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user_from_http


logger = logging.getLogger(__name__)


@channel_session_user_from_http
def data_notify_connect(message):
    logger.info('data_notify_connect. message = %s', message)
    Group('data_notifications').add(message.reply_channel)


@channel_session
def data_notify_disconnect(message):
    logger.info('data_notify_disconnect. message = %s', message)
    Group('data_notifications').discard(message.reply_channel)
