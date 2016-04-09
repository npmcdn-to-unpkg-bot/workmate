from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


class DeleteMessageMixin(object):
    success_message = None

    def dispatch(self, *args, **kwargs):
        if self.request.method == 'GET':
            object = self.get_object()
            messages.warning(self.request, 'Are you sure you want to delete %s?' % object)
        return super(DeleteMessageMixin, self).dispatch(*args, **kwargs)

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, self.success_message)
        return super(DeleteMessageMixin, self).delete(request, *args, **kwargs)


class LoginRequiredMixin(object):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(*args, **kwargs)
