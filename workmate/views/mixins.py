from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


class SuccessMessageDeleteMixin(object):
    success_message = None

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, self.success_message)
        return super(SuccessMessageDeleteMixin, self).delete(request, *args, **kwargs)


class LoginRequiredMixin(object):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(*args, **kwargs)
