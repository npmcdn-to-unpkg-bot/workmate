from django import forms


class ExcludedUniqueForm(forms.ModelForm):  # https://code.djangoproject.com/ticket/13091

    def full_clean(self):
        super(ExcludedUniqueForm, self).full_clean()
        try:
            self.instance.validate_unique()
        except forms.ValidationError as e:
            self._update_errors(e)
