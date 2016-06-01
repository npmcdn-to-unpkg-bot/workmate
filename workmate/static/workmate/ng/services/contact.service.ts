import { Injectable }                                       from '@angular/core';
import { Http, URLSearchParams }                            from '@angular/http';

import { iContact }                                         from '../models/contact';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class ContactService extends BaseService {

    objects$: Observable<iContact[]>;

    protected _objectsObserver: Observer<iContact[]>;
    protected _dataStore: { objects: iContact[], meta: Object };
    protected _baseUrl = '/api/v1/contact/';

    constructor (protected _http: Http, protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<iContact[]>((observer:any) => this._objectsObserver = observer).share();
    }

}

