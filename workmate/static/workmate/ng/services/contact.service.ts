import { Injectable }                                       from '@angular/core';
import { Http, URLSearchParams }                            from '@angular/http';

import { Contact }                                          from '../models/contact';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class ContactService extends BaseService {

    objects$: Observable<Contact[]>;

    protected _dataObserver: Observer<Contact[]>;
    protected _dataStore: { objects: Contact[] };
    protected _baseUrl = '/api/v1/contact/';

    constructor (protected _http: Http) {
        super(_http);
        this.objects$ = new Observable<Contact[]>((observer:any) => this._dataObserver = observer).share();
    }

    search(term: string) {
        var params = new URLSearchParams();
        params.set('query', term);
        params.set('format', 'json');
        this._http.get(this._baseUrl, { search: params })
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects = data;
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

}

