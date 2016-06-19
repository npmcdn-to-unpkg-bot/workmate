from django.test import override_settings

from workmate.models import Contact
from workmate.test_utils.test_case import WorkmateAPITestCase


class ContactResourceTests(WorkmateAPITestCase):

    def setUp(self):
        super(ContactResourceTests, self).setUp()

        self.existing_object = Contact.onsite.create(
            first_name='Mr',
            last_name='Smith',
            email_address='mrsmith@example.com',
            home_number='+441603123456',
            mobile_number='+447123123456',
            work_number='+441603123456',
            website='www.example.com',
            notes='some notes',
            color='#ffffff',
            address_line_1='1 Foo Place',
            address_line_2='Foo',
            city='Norwich',
            state='Norfolk',
            code='NR33FO'
        )

        self.list_url = '/api/v1/contact/'.format(self.existing_object.pk)
        self.detail_url = '{}{}/'.format(self.list_url, self.existing_object.pk)
        self.post_data = {
            'first_name': 'Mrs',
            'last_name': 'Smith',
            'email_address': 'mrssmith@example.com',
            'home_number': '+441603123456',
            'mobile_number': '+447123123456',
            'work_number': '+441603123456',
            'website': 'www.example.com',
            'notes': 'some notes',
            'color': '#000000',
            'address_line_1': '1 Foo Place',
            'address_line_2': 'Foo',
            'city': 'Norwich',
            'state': 'Norfolk',
            'code': 'NR33FO'
        }

    def test_get_list_unauthenticated(self):
        resp = self.api_client.get(self.list_url, format='json')
        self.assertEqual(resp.status_code, 401)

    def test_get_list_json(self):
        resp = self.api_client.get(
            self.list_url,
            format='json',
            authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)
        self.assertEqual(len(self.deserialize(resp)['objects']), 1)
        self.assertEqual(self.deserialize(resp)['objects'][0], {
            'absolute_url': self.existing_object.get_absolute_url(),
            'address': self.existing_object.address,
            'address_line_1': self.existing_object.address_line_1,
            'address_line_2': self.existing_object.address_line_2,
            'city': self.existing_object.city,
            'code': self.existing_object.code,
            'color': self.existing_object.color,
            'email_address': self.existing_object.email_address,
            'first_name': self.existing_object.first_name,
            'home_number': self.existing_object.home_number,
            'id': self.existing_object.pk,
            'last_name': self.existing_object.last_name,
            'mobile_number': self.existing_object.mobile_number,
            'name': self.existing_object.name,
            'notes': self.existing_object.notes,
            'resource_uri': '/api/v1/contact/{0}/'.format(self.existing_object.pk),
            'state': self.existing_object.state,
            'tags': [],
            'website': self.existing_object.website,
            'work_number': self.existing_object.work_number
        })

    def test_get_list_xml(self):
        resp = self.api_client.get(
            self.list_url,
            format='xml',
            authentication=self.get_credentials())
        self.assertValidXMLResponse(resp)

    def test_get_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail_json(self):
        resp = self.api_client.get(
            self.detail_url,
            format='json',
            authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)
        self.assertKeys(
            self.deserialize(resp), [
                'absolute_url',
                'address',
                'address_line_1',
                'address_line_2',
                'city',
                'code',
                'color',
                'email_address',
                'first_name',
                'home_number',
                'id',
                'last_name',
                'mobile_number',
                'name',
                'notes',
                'resource_uri',
                'state',
                'tags',
                'website',
                'work_number'])
        self.assertEqual(self.deserialize(resp)['absolute_url'], self.existing_object.get_absolute_url())
        self.assertEqual(self.deserialize(resp)['address'], self.existing_object.address)
        self.assertEqual(self.deserialize(resp)['address_line_1'], self.existing_object.address_line_1)
        self.assertEqual(self.deserialize(resp)['address_line_2'], self.existing_object.address_line_2)
        self.assertEqual(self.deserialize(resp)['city'], self.existing_object.city)
        self.assertEqual(self.deserialize(resp)['code'], self.existing_object.code)
        self.assertEqual(self.deserialize(resp)['color'], self.existing_object.color)
        self.assertEqual(self.deserialize(resp)['email_address'], self.existing_object.email_address)
        self.assertEqual(self.deserialize(resp)['first_name'], self.existing_object.first_name)
        self.assertEqual(self.deserialize(resp)['home_number'], self.existing_object.home_number)
        self.assertEqual(self.deserialize(resp)['last_name'], self.existing_object.last_name)
        self.assertEqual(self.deserialize(resp)['mobile_number'], self.existing_object.mobile_number)
        self.assertEqual(self.deserialize(resp)['name'], self.existing_object.name)
        self.assertEqual(self.deserialize(resp)['notes'], self.existing_object.notes)
        self.assertEqual(self.deserialize(resp)['state'], self.existing_object.state)
        self.assertEqual(self.deserialize(resp)['website'], self.existing_object.website)
        self.assertEqual(self.deserialize(resp)['work_number'], self.existing_object.work_number)

    def test_get_detail_xml(self):
        resp = self.api_client.get(
            self.detail_url,
            format='xml',
            authentication=self.get_credentials())
        self.assertValidXMLResponse(resp)

    def test_post_list_unauthenticated(self):
        self.assertHttpUnauthorized(
            self.api_client.post(self.list_url, format='json', data=self.post_data))

    def test_post_list(self):
        self.assertEqual(Contact.objects.count(), 1)
        self.assertHttpCreated(
            self.api_client.post(
                self.list_url,
                format='json',
                data=self.post_data,
                authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 2)

    def test_put_detail_unauthenticated(self):
        self.assertHttpUnauthorized(
            self.api_client.put(
                self.detail_url,
                format='json',
                data={}))

    def test_put_detail(self):
        original_data = self.deserialize(
            self.api_client.get(
                self.detail_url,
                format='json',
                authentication=self.get_credentials()))
        new_data = original_data.copy()
        new_data['first_name'] = 'Updated: Mr'

        self.assertEqual(Contact.objects.count(), 1)
        self.assertHttpOK(
            self.api_client.put(
                self.detail_url,
                format='json',
                data=new_data,
                authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 1)
        self.assertEqual(Contact.objects.get(pk=1).first_name, 'Updated: Mr')

    def test_delete_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        self.assertEqual(Contact.objects.count(), 1)
        self.assertHttpAccepted(
            self.api_client.delete(
                self.detail_url,
                format='json',
                authentication=self.get_credentials()))
        self.assertEqual(Contact.objects.count(), 0)


class FakeCallGateway(object):

    def make_call(self, user, number):
        return True, 'We are calling you now'


class FakeCallGatewayError(object):

    def make_call(self, user, number):
        return False, 'Oops! Something messed up'


class ContactResourceCallEndpointTests(WorkmateAPITestCase):

    def setUp(self):
        super(ContactResourceCallEndpointTests, self).setUp()
        self.contact = Contact.objects.create(first_name='Mr', last_name='Smith', mobile_number='+447917759123')

    @override_settings(WORKMATE_CALL_GATEWAY='workmate.tests.test_api_contact.FakeCallGateway')
    def test_success_response(self):
        response = self.api_client.post(
            '/api/v1/contact/%s/call/' % self.contact.id,
            format='json',
            data={'type': 'mobile_number'},
            authentication=self.get_credentials())
        self.assertValidJSONResponse(response)

    @override_settings(WORKMATE_CALL_GATEWAY='workmate.tests.test_api_contact.FakeCallGateway')
    def test_missing_type_response(self):
        response = self.api_client.post(
            '/api/v1/contact/%s/call/' % self.contact.id,
            format='json',
            data={},
            authentication=self.get_credentials())
        self.assertHttpBadRequest(response)

    @override_settings(WORKMATE_CALL_GATEWAY='workmate.tests.test_api_contact.FakeCallGateway')
    def test_invalid_contact_id_response(self):
        response = self.api_client.post(
            '/api/v1/contact/1000/call/',
            format='json',
            data={'type': 'mobile_number'},
            authentication=self.get_credentials())
        self.assertHttpNotFound(response)

    @override_settings(WORKMATE_CALL_GATEWAY='workmate.tests.test_api_contact.FakeCallGatewayError')
    def test_gateway_error_response(self):
        response = self.api_client.post(
            '/api/v1/contact/%s/call/' % self.contact.id,
            format='json',
            data={'type': 'mobile_number'},
            authentication=self.get_credentials())
        self.assertHttpBadRequest(response)
