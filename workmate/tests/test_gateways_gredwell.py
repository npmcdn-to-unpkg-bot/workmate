from mock import patch

from workmate.conf import WORKMATE_CALL_GATEWAY
from workmate.gateways import get_gateway_class
from workmate.gateways.gradwell.gateway import Gradwell
from workmate.models import UserSetting
from workmate.test_utils.test_case import WorkmateTestCase


def mock_gateway_post(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code
            self.text = 'OK:Call request sent'

    return MockResponse({}, 200)


def mock_gateway_post_error(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code
            self.text = 'ERR:Legacy authentication failed'

    return MockResponse({}, 401)


class MakeCallTests(WorkmateTestCase):

    def test_default_setting_is_gradwell_class(self):
        gateway = get_gateway_class(WORKMATE_CALL_GATEWAY)()
        self.assertEqual(gateway.__class__.__name__, Gradwell().__class__.__name__)

    @patch('workmate.gateways.gradwell.gateway.requests.post', side_effect=mock_gateway_post)
    def test_success_response_message(self, mock_post):
        user = self.create_user()
        UserSetting.objects.create(
            user=user,
            gradwell_token='ABC123',
            gradwell_extension='123456'
        )
        gateway = Gradwell()
        success, message = gateway.make_call(user, '01603123456')
        self.assertTrue(success)
        self.assertEqual(message, gateway.SUCCESS_MESSAGE)

    @patch('workmate.gateways.gradwell.gateway.requests.post', side_effect=mock_gateway_post)
    def test_no_profile_response_error_message(self, mock_post):
        user = self.create_user()
        gateway = Gradwell()
        success, message = gateway.make_call(user, '01603123456')
        self.assertFalse(success)
        self.assertEqual(message, gateway.ERROR_IN_SETUP_MESSAGE)

    @patch('workmate.gateways.gradwell.gateway.requests.post', side_effect=mock_gateway_post)
    def test_no_profile_settings_response_error_message(self, mock_post):
        user = self.create_user()
        UserSetting.objects.create(
            user=user
        )
        gateway = Gradwell()
        success, message = gateway.make_call(user, '01603123456')
        self.assertFalse(success)
        self.assertEqual(message, gateway.ERROR_IN_SETUP_MESSAGE)

    @patch('workmate.gateways.gradwell.gateway.requests.post', side_effect=mock_gateway_post)
    def test_incomplete_profile_settings_response_error_message(self, mock_post):
        user = self.create_user()
        UserSetting.objects.create(
            user=user,
            gradwell_token='ABC123'
        )
        gateway = Gradwell()
        success, message = gateway.make_call(user, '01603123456')
        self.assertFalse(success)
        self.assertEqual(message, gateway.ERROR_IN_SETUP_MESSAGE)

    @patch('workmate.gateways.gradwell.gateway.requests.post', side_effect=mock_gateway_post_error)
    def test_gradwell_handled_response_error_message(self, mock_post):
        user = self.create_user()
        UserSetting.objects.create(
            user=user,
            gradwell_token='ABC123',
            gradwell_extension='123456'
        )
        gateway = Gradwell()
        success, message = gateway.make_call(user, '01603123456')
        self.assertFalse(success)
        self.assertEqual(message, 'Gradwell error: Legacy authentication failed')
