from workmate.models import Tag
from workmate.test_utils.test_case import WorkmateAPITestCase


class TagResourceTests(WorkmateAPITestCase):

    def setUp(self):
        super(TagResourceTests, self).setUp()

        self.existing_object = Tag.onsite.create(title='some tag')
        self.list_url = '/api/v1/tag/'.format(self.existing_object.pk)
        self.detail_url = '{}{}/'.format(self.list_url, self.existing_object.pk)
        self.post_data = {
            'title': 'another tag',
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
            'id': self.existing_object.pk,
            'title': 'some tag',
            'resource_uri': '/api/v1/tag/{0}/'.format(self.existing_object.pk)
        })

    def test_get_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url, format='json'))

    def test_get_detail_json(self):
        resp = self.api_client.get(
            self.detail_url,
            format='json',
            authentication=self.get_credentials())
        self.assertValidJSONResponse(resp)
        self.assertKeys(self.deserialize(resp), [
            'id',
            'resource_uri',
            'title'])
        self.assertEqual(self.deserialize(resp)['title'], 'some tag')

    def test_post_list_unauthenticated(self):
        self.assertHttpUnauthorized(
            self.api_client.post(self.list_url, format='json', data=self.post_data))

    def test_post_list(self):
        self.assertEqual(Tag.objects.count(), 1)
        self.assertHttpCreated(
            self.api_client.post(
                self.list_url,
                format='json',
                data=self.post_data,
                authentication=self.get_credentials()))
        self.assertEqual(Tag.objects.count(), 2)

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
        new_data['title'] = 'Updated: some tag'

        self.assertEqual(Tag.objects.count(), 1)
        self.assertHttpOK(
            self.api_client.put(
                self.detail_url,
                format='json',
                data=new_data,
                authentication=self.get_credentials()))
        self.assertEqual(Tag.objects.count(), 1)
        self.assertEqual(Tag.objects.get(pk=1).title, 'Updated: some tag')

    def test_delete_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        self.assertEqual(Tag.objects.count(), 1)
        self.assertHttpAccepted(
            self.api_client.delete(
                self.detail_url,
                format='json',
                authentication=self.get_credentials()))
        self.assertEqual(Tag.objects.count(), 0)
