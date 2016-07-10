import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iStoryState }                                      from '../interfaces/story_state';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Subject }                                          from 'rxjs/Subject';


@Injectable()
export class StoryStateService extends BaseService {

    protected _objects$: Subject<iStoryState[]>;

    protected _dataStore: {
        meta: Object,
        objects: iStoryState[]
    };
    protected _baseUrl = '/api/v1/story_state/';
    protected _resourceName = 'story_state';
    protected _modelClass = 'StoryState';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this._objects$ = <Subject<iStoryState[]>>new Subject();
    }

}
