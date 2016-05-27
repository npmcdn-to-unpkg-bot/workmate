import { Component, provide }               from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions }   from '@angular/http';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import './imports/rxjs.ts';

import { ExRequestOptions }                 from './transportBoxes/exRequestOptions';
import { AlertService }                     from './services/alert.service';
import { ContactService }                   from './services/contact.service';
import { AlertComponent }                   from './components/alert/alert.component';
import { ContactListComponent }             from './components/contact-list/contact-list.component';


@Component({
    selector: 'contacts-app',
    template: `
        <div class="wm-messages"><alert></alert></div>
        <contact-list></contact-list>
    `,
    directives: [
        AlertComponent,
        ContactListComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        provide(RequestOptions, {useClass: ExRequestOptions}),
        AlertService,
        ContactService
    ],

})

export class ContactsComponent {}

bootstrap(ContactsComponent);