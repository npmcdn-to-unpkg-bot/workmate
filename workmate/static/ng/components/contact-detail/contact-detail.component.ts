import { Component, Input }                 from '@angular/core';

import { GoogleMap }                        from '../map/map.component';
import { iContact }                         from '../../interfaces/contact';
import { ContactService }                   from '../../services/contact.service';
import { htmlTemplate }                     from './contact-detail.component.html';

@Component({
    selector: 'contact-detail',
    template: htmlTemplate,
    directives:[GoogleMap]
})

export class ContactDetailComponent {

    @Input() contact: iContact;

    constructor(private _ContactService: ContactService) {}

    call(type: string) {
        this._ContactService.make_call(this.contact, type)
    }

}