import { Component, OnInit }            from '@angular/core';

import { iContact }                     from '../../interfaces/contact';
import { ContactService }               from '../../services/contact.service';
import { ContactDetailComponent }       from '../contact-detail/contact-detail.component';
import { htmlTemplate }                 from './contact-list.component.html';
import { ContactSearchPipe }            from '../../pipes/contact-search-pipe.ts';


@Component({
    selector: 'contact-list',
    template: htmlTemplate,
    directives: [ContactDetailComponent],
    pipes: [ContactSearchPipe]
})

export class ContactListComponent implements OnInit {

    constructor(private _ContactService: ContactService) {}

    _contacts: iContact[];
    _selectedContact: iContact;

    ngOnInit() {
        this._ContactService.objects$.subscribe(objects => this._contacts = objects);
        this._ContactService.loadAll();
    }

    onSelect(contact: iContact) {
        this._selectedContact = null;
        this._selectedContact = contact;
    }

}