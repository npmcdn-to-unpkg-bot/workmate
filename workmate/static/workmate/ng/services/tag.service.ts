import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iTag }                                             from '../models/tag';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class TagService extends BaseService {

    objects$: Observable<iTag[]>;

    protected _objectsObserver: Observer<iTag[]>;
    protected _dataStore: { objects: iTag[], meta: Object };
    protected _baseUrl = '/api/v1/tag/';

    constructor (protected _http: Http, protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<iTag[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
