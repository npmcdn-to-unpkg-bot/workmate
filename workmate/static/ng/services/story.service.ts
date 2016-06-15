import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { iStory }                                           from '../interfaces/story';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


interface EffortChoice {
  id:string;
  text:string;
}


@Injectable()
export class StoryService extends BaseService {

    objects$: Observable<iStory[]>;

    effortChoices: EffortChoice[] = [
        {id: '0.5', text: '0.5 Points'},
        {id: '1.0', text: '1 Point'},
        {id: '2.0', text: '2 Points'},
        {id: '3.0', text: '3 Points'},
        {id: '5.0', text: '5 Points'}
    ];

    protected _objectsObserver: Observer<iStory[]>;
    protected _dataStore: { objects: iStory[], meta: Object };
    protected _baseUrl = '/api/v1/story/';
    protected _resourceName = 'story';

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        super(_http, _AlertService);
        this.objects$ = new Observable<iStory[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
