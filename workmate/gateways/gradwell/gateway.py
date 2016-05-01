import requests

from ...conf import GRADWELL_URL


class Gradwell(object):

    def make_call(self, user, number):
        gradwell_token = user.usersetting.gradwell_token
        gradwell_extension = user.usersetting.gradwell_extension
        url = GRADWELL_URL.format(gradwell_token, gradwell_extension, number)
        return requests.post(url, verify=False)
