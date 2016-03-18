##################
Context Processors
##################

Site
####

The following can be used to access site specific details in templates. This is the default site from the
django sites framework.

Example usage::

    {{ site }}
    {{ site.domain }}

You can also pass directly to the site settings too::

    {{ site.sitesettings.company_name }}
    {{ site.sitesettings.company_email_address }}

Additional settings are []
