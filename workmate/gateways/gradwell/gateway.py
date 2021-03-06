import requests

from workmate.conf import settings
from workmate.models import UserSetting


class Gradwell(object):

    SUCCESS_MESSAGE = 'We are calling you now'
    ERROR_IN_SETUP_MESSAGE = (
        'Please ensure your Gradwell token and extension are set in the "Gradwell Authentication Settings" '
        'section of your account setting page')

    def make_call(self, user, number):
        try:
            gradwell_token = user.usersetting.gradwell_token
            gradwell_extension = user.usersetting.gradwell_extension
            if gradwell_token and gradwell_extension:
                url = settings.WORKMATE_GRADWELL_URL.format(gradwell_token, gradwell_extension, number)
                response = requests.post(url, verify=False)
                if response.status_code == 200:
                    return True, self.SUCCESS_MESSAGE
                else:
                    gradwell_error = response.text.replace('ERR:', 'Gradwell error: ')
                    return False, gradwell_error
        except UserSetting.DoesNotExist:
            pass
        return False, self.ERROR_IN_SETUP_MESSAGE
