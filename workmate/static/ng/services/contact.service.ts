import { Injectable }                                       from '@angular/core';
import { Http, URLSearchParams }                            from '@angular/http';

import { iContact }                                         from '../interfaces/contact';
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
    protected _resourceName = 'contact';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this.objects$ = new Observable<iContact[]>((observer:any) => this._objectsObserver = observer).share();
    }

    make_call(object: any, type: string) {
        let body = JSON.stringify({type:type});
        return this._http.post(`${this._baseUrl}${object.id}/call/`, body, this._postOptions)
            .map(this.extractData)
            .subscribe(
                res => res,
                err => this.handleError(err),
                () => this.handleCompleted('We are calling you now.')
            );

    }

}

