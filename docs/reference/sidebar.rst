#######
Sidebar
#######

Responsive
##########

Assuming your template is inheriting from ``workmate/base.html`` the sidebar is set to stay open
above a screen width of 1144px. There may be occasions where you want this to stay hidden at this width.

In these cases you need to pass a context variable from your view, example below::

    class FooList(ListView):
        model = Foo

        def get_context_data(self, **kwargs):
            context = super(FooList, self).get_context_data(**kwargs)
            context['hidden_sidebar'] = True
            return context
