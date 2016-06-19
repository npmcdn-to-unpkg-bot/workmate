from django.views.generic import TemplateView


try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class AgileIndex(LoginRequiredMixin, TemplateView):
    template_name = 'workmate/agile/index.html'
