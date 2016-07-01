from mock import patch

from workmate.models import Story, StoryState, StoryTask, StoryType
from workmate.models.abstract import SiteAbstract
from workmate.test_utils.test_case import WorkmateTestCase


class StoryModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Story, SiteAbstract))

    def test_title(self):
        field = Story._meta.get_field("title")
        self.assertFalse(field.null)

    def test_type(self):
        field = Story._meta.get_field("type")
        self.assertFalse(field.null)
        self.assertEqual(field.default, Story.DEFAULT_STORY_TYPE_ID)

    def test_state(self):
        field = Story._meta.get_field("state")
        self.assertFalse(field.null)
        self.assertEqual(field.default, Story.DEFAULT_STORY_STATE_ID)

    def test_effort(self):
        field = Story._meta.get_field("effort")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)
        self.assertEqual(field.decimal_places, 1)
        self.assertEqual(field.max_digits, 2)

    def test_description(self):
        field = Story._meta.get_field("description")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)

    def test_tags(self):
        field = Story._meta.get_field("tags")
        self.assertTrue(field.blank)

    def test_created_by(self):
        field = Story._meta.get_field("created_by")
        self.assertTrue(field.blank)
        self.assertTrue(field.default)
        self.assertFalse(field.editable)

    def test_created_on(self):
        field = Story._meta.get_field("created_on")
        self.assertTrue(field.auto_now_add)
        self.assertTrue(field.blank)
        self.assertTrue(field.default)
        self.assertFalse(field.editable)

    def test_last_modified_by(self):
        field = Story._meta.get_field("last_modified_by")
        self.assertTrue(field.blank)
        self.assertTrue(field.default)
        self.assertFalse(field.editable)

    def test_last_modified_on(self):
        field = Story._meta.get_field("last_modified_on")
        self.assertTrue(field.auto_now)
        self.assertTrue(field.blank)
        self.assertTrue(field.default)
        self.assertFalse(field.editable)

    def test_str_method(self):
        story = Story(title='Some Story')
        self.assertEqual(story.__str__(), 'Some Story')

    def test_created_by_string_method(self):
        user = self.create_user()
        story = Story(title='Some Story', created_by=user)
        self.assertEqual(story.created_by_string(), user.__str__())

    def test_last_modified_by_string_method(self):
        user = self.create_user()
        story = Story(title='Some Story', last_modified_by=user)
        self.assertEqual(story.last_modified_by_string(), user.__str__())

    ################################################
    # overridden save method tests                 #
    ################################################

    @patch('workmate.models.storymodel.get_current_user')
    def test_save_method_saves_created_by_when_new(self, fn_mock):
        user = self.create_user()
        fn_mock.return_value = user
        story = Story.objects.create(title='story', order=1)
        self.assertEqual(story.created_by, user)

    @patch('workmate.models.storymodel.get_current_user')
    def test_save_method_does_not_update_created_by_when_updating(self, fn_mock):
        user1 = self.create_user(username='foouser')
        user2 = self.create_user(username='baruser')

        fn_mock.return_value = user1
        story = Story.objects.create(title='story', order=1)

        fn_mock.return_value = user2
        story.save()

        self.assertEqual(story.created_by, user1)

    @patch('workmate.models.storymodel.get_current_user')
    def test_save_method_saves_last_modified_by_when_new(self, fn_mock):
        user = self.create_user()
        fn_mock.return_value = user
        story = Story.objects.create(title='story', order=1)
        self.assertEqual(story.last_modified_by, user)

    @patch('workmate.models.storymodel.get_current_user')
    def test_save_method_updates_last_modified_by_when_updating(self, fn_mock):
        user1 = self.create_user(username='foouser')
        user2 = self.create_user(username='baruser')

        fn_mock.return_value = user1
        story = Story.objects.create(title='story', order=1)
        self.assertEqual(story.last_modified_by, user1)

        fn_mock.return_value = user2
        story.save()
        self.assertEqual(story.last_modified_by, user2)


class StoryStateModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Story, SiteAbstract))

    def test_title(self):
        field = StoryState._meta.get_field("title")
        self.assertFalse(field.null)

    def test_order(self):
        field = StoryState._meta.get_field("order")
        self.assertEqual(field.default, 0)
        self.assertFalse(field.editable)
        self.assertTrue(field.db_index)

    def test_str_method(self):
        story = StoryState(title='Some Story')
        self.assertEqual(story.__str__(), 'Some Story')


class StoryTypeModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Story, SiteAbstract))

    def test_title(self):
        field = StoryType._meta.get_field("title")
        self.assertFalse(field.null)

    def test_icon(self):
        field = StoryType._meta.get_field("icon")
        self.assertTrue(field.null)
        self.assertTrue(field.blank)

    def test_order(self):
        field = StoryType._meta.get_field("order")
        self.assertEqual(field.default, 0)
        self.assertFalse(field.editable)
        self.assertTrue(field.db_index)

    def test_str_method(self):
        story = StoryType(title='Some Story')
        self.assertEqual(story.__str__(), 'Some Story')


class StoryTaskModelTests(WorkmateTestCase):

    def test_story(self):
        field = StoryTask._meta.get_field("story")
        self.assertFalse(field.null)

    def test_description(self):
        field = StoryTask._meta.get_field("description")
        self.assertFalse(field.null)

    def test_completed(self):
        field = StoryTask._meta.get_field("completed")
        self.assertFalse(field.null)
        self.assertFalse(field.default)

    def test_str_method(self):
        story = StoryTask(description='Some Task')
        self.assertEqual(story.__str__(), 'Some Task')
