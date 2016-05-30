import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { Story }                                            from '../models/story';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryService extends BaseService {

    objects$: Observable<Story[]>;

    protected _objectsObserver: Observer<Story[]>;
    protected _dataStore: { objects: Story[], meta: Object };
    protected _baseUrl = '/api/v1/story/';

    constructor (protected _http: Http, protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<Story[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
