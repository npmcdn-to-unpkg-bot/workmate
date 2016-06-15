import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iStoryType }                                       from '../interfaces/story_type';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryTypeService extends BaseService {

    objects$: Observable<iStoryType[]>;

    protected _objectsObserver: Observer<iStoryType[]>;
    protected _dataStore: { objects: iStoryType[], meta: Object };
    protected _baseUrl = '/api/v1/story_type/';
    protected _resourceName = 'story_type';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this.objects$ = new Observable<iStoryType[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
