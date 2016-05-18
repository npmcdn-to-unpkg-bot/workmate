import { Component, OnInit }            from '@angular/core';

import { Contact }                      from '../../models/contact';
import { ContactService }               from '../../services/contact.service';
import { ContactDetailComponent }       from '../contact-detail/contact-detail.component';
import { htmlTemplate }                 from './contact-list.component.html';


@Component({
    selector: 'contact-list',
    template: htmlTemplate,
    directives: [
        ContactDetailComponent
    ]
})

export class ContactListComponent implements OnInit {

    constructor(
        private contactService: ContactService
    ) {}

    errorMessage: string;
    contacts: Contact[];
    selectedContact: Contact;

    search (term: string) {
        this.contactService.search(term)
            .then(
                contacts => this.contacts = contacts,
                error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.search('');
    }

    onSelect(contact: Contact) {
        this.selectedContact = contact;
    }

}