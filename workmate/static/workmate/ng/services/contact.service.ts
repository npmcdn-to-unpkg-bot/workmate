import { Injectable }                           from '@angular/core';
import { Http, Response, URLSearchParams }      from '@angular/http';

import { Contact }                              from '../models/contact';

@Injectable()
export class ContactService {

    constructor (private http: Http) {}

    private contactsUrl = 'api/v1/contact';

    search (term: string): Promise<Contact[]> {

        var params = new URLSearchParams();

        params.set('query', term);
        params.set('format', 'json');

        return this.http
            .get(this.contactsUrl, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getContact (id: number): Promise<Contact> {

        return this.http
            .get(this.contactsUrl + '/' + id)
            .toPromise()
            .then(this.extractData)
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
        return Promise.reject(errMsg);
    }
}