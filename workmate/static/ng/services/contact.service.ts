import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iContact }                                         from '../interfaces/contact';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Subject }                                          from 'rxjs/Subject';


@Injectable()
export class ContactService extends BaseService {

    protected _objects$: Subject<iContact[]>;

    protected _dataStore: {
        meta: Object,
        objects: iContact[]
    };
    protected _baseUrl = '/api/v1/contact/';
    protected _resourceName = 'contact';
    protected _modelClass = 'Contact';
    
    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this._objects$ = <Subject<iContact[]>>new Subject();
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
