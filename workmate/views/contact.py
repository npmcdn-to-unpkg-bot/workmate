from django.contrib.messages.views import SuccessMessageMixin
from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView, View
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import CreateView, DeleteView, UpdateView

from .mixins import DeleteMessageMixin, JSONResponseMixin
from ..conf import WORKMATE_CALL_GATEWAY, WORKMATE_PAGINATE_BY
from ..forms import ContactForm
from ..gateways import get_gateway_class
from ..models import Contact

try:
    from django.contrib.auth.mixins import LoginRequiredMixin
except:
    from .mixins import LoginRequiredMixin


class ContactCall(LoginRequiredMixin, JSONResponseMixin, SingleObjectMixin, View):
    model = Contact

    def post(self, request, *args, **kwargs):
        type = request.POST.get('type')
        if type:
            try:
                object = self.get_object()
                number_attr = getattr(object, type)
                number = number_attr.as_national.replace(' ', '')
                call_gateway = get_gateway_class(WORKMATE_CALL_GATEWAY)()
                response = call_gateway.make_call(number)
                if response.status_code == 200:
                    data = {'status': 'ok', 'message': 'We are calling you now.'}
                    return self.render_to_response(data)
                else:
                    data = {'status': 'error', 'message': response.text}
                    return self.render_to_bad_response(data)
            except:
                pass

        data = {'status': 'error', 'message': 'Something went wrong.'}
        return self.render_to_bad_response(data)


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
    paginate_by = WORKMATE_PAGINATE_BY

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
