from django.contrib.messages.views import SuccessMessageMixin
from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView, View
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from .mixins import DeleteMessageMixin, JSONResponseMixin
from workmate.conf import settings
from workmate.forms import ContactForm
from workmate.gateways import get_gateway_class
from workmate.models import Contact

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class ContactCall(LoginRequiredMixin, JSONResponseMixin, SingleObjectMixin, View):
    model = Contact

    def post(self, request, *args, **kwargs):
        type = request.POST.get('type')
        if not type:
            return self.render_to_bad_response({'message': 'Requires type parameter'})
        try:
            object = self.get_object()
            number_attr = getattr(object, type)
            number = number_attr.as_national.replace(' ', '')
            call_gateway = get_gateway_class(settings.WORKMATE_CALL_GATEWAY)()
            success, message = call_gateway.make_call(request.user, number)
            if success:
                return self.render_to_response({'message': message})
            return self.render_to_bad_response({'message': message})
        except:
            pass
        return self.render_to_bad_response({'message': 'Something went wrong'})


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


class ContactList(LoginRequiredMixin, ListView):
    model = Contact
    template_name = 'workmate/contacts/list.html'
    paginate_by = settings.WORKMATE_PAGINATE_BY

    def get_queryset(self):
        queryset = super(ContactList, self).get_queryset()
        tag = self.request.GET.get('tag', None)
        if tag:
            queryset = queryset.filter(tags__pk=int(tag))
        return queryset


class ContactUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Contact
    form_class = ContactForm
    template_name = 'workmate/contacts/edit.html'
    success_message = 'The contact was updated successfully.'
