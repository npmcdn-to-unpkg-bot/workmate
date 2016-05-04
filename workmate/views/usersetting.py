from django.contrib.messages.views import SuccessMessageMixin
from django.core.urlresolvers import reverse_lazy
from django.views.generic.edit import UpdateView

from workmate.forms import UserSettingForm
from workmate.models import UserSetting

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class UserSettingUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = UserSetting
    form_class = UserSettingForm
    template_name = 'workmate/usersettings/edit.html'
    success_message = 'Your settings were updated successfully.'
    success_url = reverse_lazy('usersetting-update')

    def get_object(self, queryset=None):
        obj, created = UserSetting.objects.get_or_create(user=self.request.user)
        return obj

    def form_valid(self, form):
        form.instance.user = self.request.user
        form.save()
        return super(UserSettingUpdate, self).form_valid(form)
