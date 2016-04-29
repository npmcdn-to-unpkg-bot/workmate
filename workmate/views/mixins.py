from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http.response import HttpResponseBadRequest
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


class JSONResponseMixin(object):
    def render_to_response(self, context, **response_kwargs):
        return self.render_to_json_response(context, **response_kwargs)

    def render_to_bad_response(self, context, **response_kwargs):
        return HttpResponseBadRequest(self.get_data(context), **response_kwargs)

    def render_to_json_response(self, context, **response_kwargs):
        return JsonResponse(self.get_data(context), **response_kwargs)

    def get_data(self, context):
        return context


class LoginRequiredMixin(object):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(LoginRequiredMixin, self).dispatch(*args, **kwargs)
