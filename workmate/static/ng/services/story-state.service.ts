import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iStoryState }                                      from '../interfaces/story_state';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryStateService extends BaseService {

    objects$: Observable<iStoryState[]>;

    protected _objectsObserver: Observer<iStoryState[]>;
    protected _dataStore: { objects: iStoryState[], meta: Object };
    protected _baseUrl = '/api/v1/story_state/';
    protected _resourceName = 'story_state';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this.objects$ = new Observable<iStoryState[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
