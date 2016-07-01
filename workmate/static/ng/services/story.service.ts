import { Injectable }                                       from '@angular/core';
import { Http, Response }                                   from '@angular/http';

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

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        let data:any = body.object || body.objects || body || { };
        if (data instanceof Array) {
            data.forEach((d:any) => {
                if (d.created_on) d.created_on = new Date(d.created_on.toString());
                if (d.last_modified_on) d.last_modified_on = new Date(d.last_modified_on.toString());
            });
        } else {
            if (data.created_on) data.created_on = new Date(data.created_on.toString());
            if (data.last_modified_on) data.last_modified_on = new Date(data.last_modified_on.toString());
        }
        return data;
    }

}
