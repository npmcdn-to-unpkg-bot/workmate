from django.contrib.messages.views import SuccessMessageMixin
from django.core.urlresolvers import reverse_lazy
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from .mixins import DeleteMessageMixin
from workmate.forms import ContactForm
from workmate.models import Contact

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class ContactCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Contact
    form_class = ContactForm
    template_name = 'workmate/contacts/create.html'
    success_message = 'The contact was created successfully.'


class ContactDelete(LoginRequiredMixin, DeleteMessageMixin, DeleteView):
    model = Contact
    template_name = 'workmate/contacts/delete.html'
    success_message = 'The contact was deleted successfully.'
    success_url = reverse_lazy('contact-list')


class ContactList(LoginRequiredMixin, TemplateView):
    template_name = 'workmate/contacts/list.html'


class ContactUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Contact
    form_class = ContactForm
    template_name = 'workmate/contacts/edit.html'
    success_message = 'The contact was updated successfully.'
