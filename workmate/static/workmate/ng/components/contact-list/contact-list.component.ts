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

    constructor(private contactService: ContactService) {}

    contacts: iContact[];
    selectedContact: iContact;

    ngOnInit() {
        this.contactService.objects$.subscribe(objects => this.contacts = objects);
        this.contactService.loadAll();
    }

    onSelect(contact: iContact) {
        this.selectedContact = contact;
    }

}