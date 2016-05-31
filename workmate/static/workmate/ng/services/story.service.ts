import { Injectable }                                       from '@angular/core';
import { Http }                                             from '@angular/http';

import { Story }                                            from '../models/story';
import { AlertService }                                     from './alert.service';
import { BaseService }                                      from './base.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


interface EffortChoice {
  value:string;
  label:string;
}


@Injectable()
export class StoryService extends BaseService {

    objects$: Observable<Story[]>;

    effortChoices: EffortChoice[] = [
        {value: '0.5', label: '0.5 Points'},
        {value: '1.0', label: '1 Point'},
        {value: '2.0', label: '2 Points'},
        {value: '3.0', label: '3 Points'},
        {value: '5.0', label: '5 Points'}
    ];

    protected _objectsObserver: Observer<Story[]>;
    protected _dataStore: { objects: Story[], meta: Object };
    protected _baseUrl = '/api/v1/story/';

    constructor (protected _http: Http, protected _alertService: AlertService) {
        super(_http, _alertService);
        this.objects$ = new Observable<Story[]>((observer:any) => this._objectsObserver = observer).share();
    }

}
