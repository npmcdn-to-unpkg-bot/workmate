from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from ..models import Contact

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class ContactCreate(LoginRequiredMixin, CreateView):
    model = Contact
    fields = '__all__'
    template_name = 'workmate/contacts/create.html'


class ContactDelete(LoginRequiredMixin, DeleteView):
    model = Contact
    template_name = 'workmate/contacts/delete.html'
    success_url = reverse_lazy('contact-list')


class ContactList(LoginRequiredMixin, ListView):
    model = Contact
    template_name = 'workmate/contacts/list.html'


class ContactUpdate(LoginRequiredMixin, UpdateView):
    model = Contact
    fields = '__all__'
    template_name = 'workmate/contacts/edit.html'
