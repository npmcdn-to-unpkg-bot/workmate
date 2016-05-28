# -*- coding: utf-8 -*-
from tastypie.fields import RelatedField
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
                resource_uri = (data[name] if not rel_field.full else data[name]['resource_uri'])
                pk = self._get_pk_from_resource_uri(rel_field, resource_uri)
                kwargs['data'][name] = pk
        return kwargs
