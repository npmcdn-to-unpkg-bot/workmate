import requests

from ...conf import GRADWELL_URL


class Gradwell(object):

    def make_call(self, number):
        gradwell_token = ''  # TODO: get from profile
        gradwell_extension = ''  # TODO: get from profile
        url = GRADWELL_URL.format(gradwell_token, gradwell_extension, number)
        return requests.post(url, verify=False)
