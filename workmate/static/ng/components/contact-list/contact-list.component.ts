import { Component, OnInit }            from '@angular/core';

import { iContact }                     from '../../interfaces/contact';
import { ContactService }               from '../../services/contact.service';
import { ContactDetailComponent }       from '../contact-detail/contact-detail.component';
import { htmlTemplate }                 from './contact-list.component.html';
import { ContactSearchPipe }            from '../../pipes/contact-search-pipe.ts';

import { Observable }                   from 'rxjs/Observable';


@Component({
    selector: 'contact-list',
    template: htmlTemplate,
    directives: [ContactDetailComponent],
    pipes: [ContactSearchPipe]
})

export class ContactListComponent implements OnInit {

    constructor(private _ContactService: ContactService) {}

    _contacts: Observable<iContact[]>;
    _selectedContact: Observable<iContact>;

    ngOnInit() {
        this._contacts = this._ContactService.objects$;
        this._ContactService.loadAll();
    }

    selectContact(contact: iContact) {
        this._selectedContact = this._ContactService.objects$.map(objects => objects.find(item => item.id === contact.id));
        this._ContactService.load(contact.id);
    }

}