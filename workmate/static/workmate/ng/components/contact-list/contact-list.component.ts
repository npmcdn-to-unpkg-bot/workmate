import { Component, OnInit }            from '@angular/core';

import { Contact }                      from '../../models/contact';
import { ContactService }               from '../../services/contact.service';
import { ContactDetailComponent }       from '../contact-detail/contact-detail.component';
import { htmlTemplate }                 from './contact-list.component.html';

import { Observable }                   from 'rxjs/Observable';


@Component({
    selector: 'contact-list',
    template: htmlTemplate,
    directives: [ContactDetailComponent],
})

export class ContactListComponent implements OnInit {

    constructor(private contactService: ContactService) {}

    contacts: Observable<Contact[]>;
    errorMessage: string;
    selectedContact: Contact;

    ngOnInit() {
        this.contacts = this.contactService.objects$;
        this.contactService.loadAll();
    }

    search (term: string) {
        this.contactService.search(term);
    }

    onSelect(contact: Contact) {
        this.selectedContact = contact;
    }

}