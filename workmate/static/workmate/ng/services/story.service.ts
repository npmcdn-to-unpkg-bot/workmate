import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { Story }                                            from '../models/story';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryService extends BaseService {

    objects$: Observable<Story[]>;

    protected _dataObserver: Observer<Story[]>;
    protected _dataStore: { objects: Story[] };
    protected _baseUrl = '/api/v1/story/';

    constructor (protected _http: Http) {
        super(_http);
        this.objects$ = new Observable<Story[]>((observer:any) => this._dataObserver = observer).share();
    }

}
