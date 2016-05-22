import { Injectable }                                       from '@angular/core';
import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Tag }                                              from '../models/tag';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class TagService {

    tags$: Observable<Tag[]>;

    private _tagsObserver: Observer<Tag[]>;

    private _dataStore: { tags: Tag[] };

    private postOptions = new ExRequestOptions();

    constructor (private _http: Http) {
        this._dataStore = { tags: [] };
        this.tags$ = new Observable<Tag[]>((observer:any) => this._tagsObserver = observer).share();
        this.postOptions.appendHeaders('Content-Type', 'application/json');
    }

    private baseUrl = '/api/v1/tag/';

    loadAll() {
        this._http.get(this.baseUrl)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.tags = data;
                this._tagsObserver.next(this._dataStore.tags);
            }, this.handleError
        );
    }

    load(id: any) {
        this._http.get(`${this.baseUrl}${id}/`)
            .map(this.extractData)
            .subscribe(data => {
                let found = false;
                this._dataStore.tags.forEach((item, index) => {
                    if(item.id === data.id) {
                        this._dataStore.tags[index] = data;
                        found = true;
                    }
                });
                if (!found) {
                    this._dataStore.tags.push(data);
                }
                this._tagsObserver.next(this._dataStore.tags);
            }, this.handleError
        );
    }

    create(object: Tag) {
        let body = JSON.stringify(object);
        this._http.post(this.baseUrl, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.tags.push(data);
                this._tagsObserver.next(this._dataStore.tags);
            }, this.handleError
        );
    }

    update(object: Tag) {
        let body = JSON.stringify(object);
        this._http.put(`${this.baseUrl}${object.id}/`, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.tags.forEach((tag, i) => {
                    if (tag.id === data.id) {
                        this._dataStore.tags[i] = data; }
                    });
                this._tagsObserver.next(this._dataStore.tags);
            }, this.handleError
        );
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || body || { };
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
