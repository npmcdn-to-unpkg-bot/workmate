# -*- coding: utf-8 -*-
from tastypie.fields import RelatedField, ToManyField
from tastypie.resources import ModelResource
from tastypie.validation import FormValidation


class ModelFormValidation(FormValidation):

    resource = ModelResource

    def __init__(self, **kwargs):
        self.resource = kwargs.pop('resource')
        super(ModelFormValidation, self).__init__(**kwargs)

    def _get_pk_from_resource_uri(self, resource_field, resource_uri):
        base_resource_uri = resource_field.to().get_resource_uri()
        before, after = resource_uri.split(base_resource_uri)
        return after[:-1] if after.endswith('/') else after

    def form_args(self, bundle):
        rsc = self.resource()
        kwargs = super(ModelFormValidation, self).form_args(bundle)

        for name, rel_field in rsc.fields.items():
            data = kwargs.get('data')
            if not issubclass(rel_field.__class__, RelatedField):
                continue
            if name in data and data[name]:
                if issubclass(rel_field.__class__, ToManyField):
                    pks = []
                    for item in data[name]:
                        resource_uri = (item if not rel_field.full else item.get('resource_uri'))
                        if resource_uri:
                            pks.append(self._get_pk_from_resource_uri(rel_field, resource_uri))
                    kwargs['data'][name] = pks
                else:
                    resource_uri = (data[name] if not rel_field.full else data[name].get('resource_uri'))
                    pk = self._get_pk_from_resource_uri(rel_field, resource_uri)
                    kwargs['data'][name] = pk
        return kwargs
