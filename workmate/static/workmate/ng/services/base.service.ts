import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Story }                                            from '../models/story';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


export class FakeObject {
    id: number
}

export class BaseService {

    // params that require overriding
    objects$: Observable<FakeObject[]>;

    protected _dataObserver: Observer<FakeObject[]>;
    protected _dataStore: { objects: FakeObject[] };
    protected _baseUrl = '';

    // params that do not require overriding
    protected _postOptions = new ExRequestOptions();

    constructor (protected _http: Http) {
        this._dataStore = { objects: [] };
        this.objects$ = new Observable<Story[]>((observer:any) => this._dataObserver = observer).share();
        this._postOptions.appendHeaders('Content-Type', 'application/json');
    }

    loadAll() {
        this._http.get(this._baseUrl)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects = data;
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

    load(id: number) {
        this._http.get(`${this._baseUrl}${id}/`)
            .map(this.extractData)
            .subscribe(data => {
                let found = false;
                this._dataStore.objects.forEach((item, index) => {
                    if(item.id === data.id) {
                        this._dataStore.objects[index] = data;
                        found = true;
                    }
                });
                if (!found) {
                    this._dataStore.objects.push(data);
                }
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

    create(object: any) {
        let body = JSON.stringify(object);
        this._http.post(this._baseUrl, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.push(data);
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

    update(object: any) {
        let body = JSON.stringify(object);
        this._http.put(`${this._baseUrl}${object.id}/`, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === data.id) {
                        this._dataStore.objects[i] = data; }
                    });
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

    delete(id: number) {
        this._http.delete(`${this._baseUrl}${id}/`)
            .subscribe(response => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === id) { this._dataStore.objects.splice(i, 1); }
                });
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError
        );
    }

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || body || { };
    }

    protected handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
