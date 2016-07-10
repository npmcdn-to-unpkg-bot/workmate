import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iTag }                                             from '../interfaces/tag';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Subject }                                          from 'rxjs/Subject';


@Injectable()
export class TagService extends BaseService {

    protected _objects$: Subject<iTag[]>;

    protected _dataStore: {
        meta: Object,
        objects: iTag[]
    };
    protected _baseUrl = '/api/v1/tag/';
    protected _resourceName = 'tag';
    protected _modelClass = 'Tag';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this._objects$ = <Subject<iTag[]>>new Subject();
    }

}