import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { StoryState }                                       from '../models/story';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryStateService extends BaseService {

    objects$: Observable<StoryState[]>;

    protected _dataObserver: Observer<StoryState[]>;
    protected _dataStore: { objects: StoryState[] };
    protected _baseUrl = '/api/v1/story_state/';

    constructor (
            protected _http: Http,
            protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<StoryState[]>((observer:any) => this._dataObserver = observer).share();
    }

}
