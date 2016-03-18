from django.core.urlresolvers import reverse

from workmate.test_utils.test_case import WorkmateTestCase
from workmate.tests.mixins import AuthTestMixin


class MainTests(AuthTestMixin, WorkmateTestCase):

    def get_url(self):
        return reverse('workmate-main')
