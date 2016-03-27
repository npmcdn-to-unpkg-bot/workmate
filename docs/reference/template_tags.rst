#############
Template Tags
#############

Tags Filter
###########

If your are using the tags model from ``workmate.models.Tag`` as in the below example::

    from workmate.models import Tag
    from workmate.models.abstract import SiteAbstract

    class Foo(SiteAbstract):
        foo = models.CharField(max_length=255)
        tags = models.ManyToManyField(Tag, blank=True)

Then the following filter can be used in the sidebar to append to your list url a ``?tag=1``
It creates a handy list of used tags to easily filter your list::

    {% load filter_tags %}
    {% show_tags_filter 'contact' 'contact-list' %}

``related_model``
  The name of the related model from Tag, and is used to count the objects.

``url``
  Used for the url prefix before ``?tags=1``

You will need to handle the filtering but an example is below from the contacts list::

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