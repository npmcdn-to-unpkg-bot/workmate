from workmate.utils.threadlocal import set_current_user


class CurrentUserMiddleware(object):
    def process_request(self, request):
        set_current_user(getattr(request, 'user', None))
