import { Component, Input }               from '@angular/core';

import { iContact }                       from '../../interfaces/contact';
import { htmlTemplate }                   from './contact-detail.component.html';

@Component({
    selector: 'contact-detail',
    template: htmlTemplate
})

export class ContactDetailComponent {

    @Input() contact: iContact;

}