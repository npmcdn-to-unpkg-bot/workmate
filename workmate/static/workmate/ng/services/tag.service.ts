import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { Tag }                                              from '../models/tag';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class TagService extends BaseService {

    objects$: Observable<Tag[]>;

    protected _dataObserver: Observer<Tag[]>;
    protected _dataStore: { objects: Tag[] };
    protected _baseUrl = '/api/v1/tag/';

    constructor (protected _http: Http) {
        super(_http);
        this.objects$ = new Observable<Tag[]>((observer:any) => this._dataObserver = observer).share();
    }

}
