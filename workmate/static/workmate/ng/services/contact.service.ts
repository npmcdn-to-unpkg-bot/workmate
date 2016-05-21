import { Injectable }                           from '@angular/core';
import { Http, Response, URLSearchParams }      from '@angular/http';

import { Contact }                              from '../models/contact';

import { Observable }                           from 'rxjs/Observable';


@Injectable()
export class ContactService {

    constructor (private http: Http) {}

    private contactsUrl = 'api/v1/contact';

    search (term: string): Observable<Contact[]> {

        var params = new URLSearchParams();

        params.set('query', term);
        params.set('format', 'json');

        return this.http
            .get(this.contactsUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getContact (id: number): Observable<Contact> {

        return this.http
            .get(this.contactsUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || { };
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}