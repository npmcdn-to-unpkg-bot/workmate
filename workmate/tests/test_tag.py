from workmate.models import Tag
from workmate.models.abstract import SiteAbstract
from workmate.test_utils.test_case import WorkmateTestCase


class ModelTests(WorkmateTestCase):

    def test_base_class_is_site_abstract(self):
        self.assertTrue(issubclass(Tag, SiteAbstract))

    def test_title(self):
        field = Tag._meta.get_field("title")
        self.assertFalse(field.null)
        self.assertEqual(field.max_length, 255)

    def test_str_method(self):
        tag = Tag(title='Xmas Card')
        self.assertEqual(tag.__str__(), 'Xmas Card')
