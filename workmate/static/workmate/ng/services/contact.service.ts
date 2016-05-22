import { Injectable }                                       from '@angular/core';
import { Http, Response, URLSearchParams }                  from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Contact }                                          from '../models/contact';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class ContactService {

    contacts$: Observable<Contact[]>;

    private _contactsObserver: Observer<Contact[]>;
    private _dataStore: { contacts: Contact[] };

    private postOptions = new ExRequestOptions();

    constructor (private _http: Http) {
        this._dataStore = { contacts: [] };
        this.contacts$ = new Observable<Contact[]>((observer:any) => this._contactsObserver = observer).share();
        this.postOptions.appendHeaders('Content-Type', 'application/json');
    }

    private baseUrl = '/api/v1/contact/';

    loadAll() {
        this._http.get(this.baseUrl)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.contacts = data;
                this._contactsObserver.next(this._dataStore.contacts);
            }, this.handleError
        );
    }

    load(id: any) {
        this._http.get(`${this.baseUrl}${id}/`)
            .map(this.extractData)
            .subscribe(data => {
                let found = false;
                this._dataStore.contacts.forEach((item, index) => {
                    if(item.id === data.id) {
                        this._dataStore.contacts[index] = data;
                        found = true;
                    }
                });
                if (!found) {
                    this._dataStore.contacts.push(data);
                }
                this._contactsObserver.next(this._dataStore.contacts);
            }, this.handleError
        );
    }

    create(object: Contact) {
        let body = JSON.stringify(object);
        this._http.post(this.baseUrl, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.contacts.push(data);
                this._contactsObserver.next(this._dataStore.contacts);
            }, this.handleError
        );
    }

    update(object: Contact) {
        let body = JSON.stringify(object);
        this._http.put(`${this.baseUrl}${object.id}/`, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.contacts.forEach((contact, i) => {
                    if (contact.id === data.id) {
                        this._dataStore.contacts[i] = data; }
                    });
                this._contactsObserver.next(this._dataStore.contacts);
            }, this.handleError
        );
    }

    search(term: string) {
        var params = new URLSearchParams();
        params.set('query', term);
        params.set('format', 'json');
        this._http.get(this.baseUrl, { search: params })
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.contacts = data;
                this._contactsObserver.next(this._dataStore.contacts);
            }, this.handleError
        );
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || body || { };
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}

