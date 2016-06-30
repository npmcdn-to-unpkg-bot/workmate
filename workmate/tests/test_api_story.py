from workmate.models import Story, StoryType, StoryState
from workmate.test_utils.test_case import WorkmateAPITestCase


class StoryResourceTests(WorkmateAPITestCase):

    def setUp(self):
        super(StoryResourceTests, self).setUp()

        self.type = StoryType.onsite.create(title='Type')
        self.serialized_type = {
            'id': self.type.pk,
            'resource_uri': '/api/v1/story_type/{}/'.format(self.type.pk),
            'title': 'Type'
        }

        self.state = StoryState.onsite.create(title='Done')
        self.serialized_state = {
            'id': self.state.pk,
            'order': self.state.order,
            'resource_uri': '/api/v1/story_state/{}/'.format(self.state.pk),
            'title': 'Done'
        }

        self.existing_object = Story.onsite.create(
            title='Story',
            type=self.type,
            state=self.state,
            effort='1.0',
            description='Description',
            icebox=True,
            order='100.00000000'
        )

        self.list_url = '/api/v1/story/'.format(self.existing_object.pk)
        self.detail_url = '{}{}/'.format(self.list_url, self.existing_object.pk)
        self.post_data = {
            'title': 'Another Story',
            'type': self.serialized_type,
            'state': self.serialized_state,
            'effort': '1.0',
            'description': 'Description',
            'order': '100.00000000'
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
            'description': self.existing_object.description,
            'effort': self.existing_object.effort,
            'icebox': self.existing_object.icebox,
            'id': self.existing_object.pk,
            'order': self.existing_object.order,
            'resource_uri': '/api/v1/story/{0}/'.format(self.existing_object.pk),
            'state': self.serialized_state,
            'tags': [],
            'tasks': [],
            'title': self.existing_object.title,
            'type': self.serialized_type
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
                'description',
                'effort',
                'icebox',
                'id',
                'order',
                'resource_uri',
                'state',
                'tags',
                'tasks',
                'title',
                'type'])
        self.assertEqual(self.deserialize(resp)['icebox'], self.existing_object.icebox)
        self.assertEqual(self.deserialize(resp)['description'], self.existing_object.description)
        self.assertEqual(self.deserialize(resp)['effort'], self.existing_object.effort)
        self.assertEqual(self.deserialize(resp)['order'], self.existing_object.order)
        self.assertEqual(self.deserialize(resp)['title'], self.existing_object.title)
        self.assertEqual(self.deserialize(resp)['state'], self.serialized_state)
        self.assertEqual(self.deserialize(resp)['tags'], [])
        self.assertEqual(self.deserialize(resp)['type'], self.serialized_type)

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
        self.assertEqual(Story.objects.count(), 1)
        self.assertHttpCreated(
            self.api_client.post(
                self.list_url,
                format='json',
                data=self.post_data,
                authentication=self.get_credentials()))
        self.assertEqual(Story.objects.count(), 2)

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
        new_data['title'] = 'Updated: Story'

        self.assertEqual(Story.objects.count(), 1)
        self.assertHttpOK(
            self.api_client.put(
                self.detail_url,
                format='json',
                data=new_data,
                authentication=self.get_credentials()))
        self.assertEqual(Story.objects.count(), 1)
        self.assertEqual(Story.objects.get(pk=1).title, 'Updated: Story')

    def test_delete_detail_unauthenticated(self):
        self.assertHttpUnauthorized(self.api_client.delete(self.detail_url, format='json'))

    def test_delete_detail(self):
        self.assertEqual(Story.objects.count(), 1)
        self.assertHttpAccepted(
            self.api_client.delete(
                self.detail_url,
                format='json',
                authentication=self.get_credentials()))
        self.assertEqual(Story.objects.count(), 0)
