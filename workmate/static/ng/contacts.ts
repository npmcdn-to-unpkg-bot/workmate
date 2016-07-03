import { Component, provide }               from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions }   from '@angular/http';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import './imports/rxjs.ts';

import { ExRequestOptions }                 from './transportBoxes/exRequestOptions';
import { AlertService }                     from './services/alert.service';
import { ContactService }                   from './services/contact.service';
import { AlertBlockComponent }              from './components/alert/alert.component';
import { ContactListComponent }             from './components/contact-list/contact-list.component';

import { GOOGLE_MAPS_PROVIDERS }            from 'angular2-google-maps/core';


@Component({
    selector: 'contacts-app',
    template: `
        <div class="messages"><alert-block></alert-block></div>
        <contact-list></contact-list>
    `,
    directives: [
        AlertBlockComponent,
        ContactListComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        GOOGLE_MAPS_PROVIDERS,
        provide(RequestOptions, {useClass: ExRequestOptions}),
        AlertService,
        ContactService
    ],

})

export class ContactsComponent {}

bootstrap(ContactsComponent);