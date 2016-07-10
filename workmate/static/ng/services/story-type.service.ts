import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iStoryType }                                       from '../interfaces/story_type';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Subject }                                          from 'rxjs/Subject';


@Injectable()
export class StoryTypeService extends BaseService {

    protected _objects$: Subject<iStoryType[]>;

    protected _dataStore: {
        meta: Object,
        objects: iStoryType[]
    };
    protected _baseUrl = '/api/v1/story_type/';
    protected _resourceName = 'story_type';
    protected _modelClass = 'StoryType';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this._objects$ = <Subject<iStoryType[]>>new Subject();
    }

}