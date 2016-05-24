import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { StoryType }                                        from '../models/story';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryTypeService extends BaseService {

    objects$: Observable<StoryType[]>;

    protected _dataObserver: Observer<StoryType[]>;
    protected _dataStore: { objects: StoryType[] };
    protected _baseUrl = '/api/v1/story_type/';

    constructor (protected _http: Http) {
        super(_http);
        this.objects$ = new Observable<StoryType[]>((observer:any) => this._dataObserver = observer).share();
    }

}
