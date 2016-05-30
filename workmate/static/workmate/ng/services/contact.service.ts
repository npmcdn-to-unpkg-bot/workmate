import { Injectable }                                       from '@angular/core';
import { Http, URLSearchParams }                            from '@angular/http';

import { Contact }                                          from '../models/contact';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class ContactService extends BaseService {

    objects$: Observable<Contact[]>;

    protected _objectsObserver: Observer<Contact[]>;
    protected _dataStore: { objects: Contact[], meta: Object };
    protected _baseUrl = '/api/v1/contact/';

    constructor (protected _http: Http, protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<Contact[]>((observer:any) => this._objectsObserver = observer).share();
    }

}

