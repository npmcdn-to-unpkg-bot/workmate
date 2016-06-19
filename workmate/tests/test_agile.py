from django.core.urlresolvers import reverse
from django.views.generic import TemplateView

from workmate.test_utils.test_case import WorkmateTestCase
from workmate.tests.mixins import AuthTestMixin
from workmate.views import AgileIndex


class ModelTests(WorkmateTestCase):

    def test_todo(self):
        pass


class IndexViewTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        return reverse('agile-index')

    def test_is_correct_base_class(self):
        self.assertTrue(issubclass(AgileIndex, TemplateView))
