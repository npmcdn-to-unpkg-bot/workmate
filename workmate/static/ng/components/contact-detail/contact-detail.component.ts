import { Component, Input }                 from '@angular/core';

import { iContact }                         from '../../interfaces/contact';
import { ContactService }                   from '../../services/contact.service';
import { htmlTemplate }                     from './contact-detail.component.html';

import { Observable }                       from 'rxjs/Observable';


@Component({
    selector: 'contact-detail',
    template: htmlTemplate
})

export class ContactDetailComponent {

    @Input() contact: Observable<iContact>;

    constructor(private _ContactService: ContactService) {}

    call(type: string) {
        this._ContactService.make_call(this.contact, type)
    }

}