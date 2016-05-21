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

    def test_str_method(self):
        tag = Story(title='Some Story')
        self.assertEqual(tag.__str__(), 'Some Story')


class StoryStateModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Story, SiteAbstract))

    def test_title(self):
        field = StoryState._meta.get_field("title")
        self.assertFalse(field.null)

    def test_str_method(self):
        story = StoryState(title='Some Story')
        self.assertEqual(story.__str__(), 'Some Story')


class StoryTypeModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Story, SiteAbstract))

    def test_title(self):
        field = StoryType._meta.get_field("title")
        self.assertFalse(field.null)

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
