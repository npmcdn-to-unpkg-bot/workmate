from django.views.generic import TemplateView

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class MainView(LoginRequiredMixin, TemplateView):
    template_name = 'workmate/main.html'
