import { Component }                        from '@angular/core';
import { HTTP_PROVIDERS }                   from '@angular/http';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import './imports/rxjs.ts';

import { ContactService }                   from './services/contact.service';
import { ContactListComponent }             from './components/contact-list/contact-list.component';

@Component({
    selector: 'contacts-app',
    template: `
      <contact-list></contact-list>
    `,
    directives: [
        ContactListComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        ContactService
    ],

})

export class ContactsComponent {}

bootstrap(ContactsComponent);