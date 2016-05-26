import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';

declare var jQuery: any;


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
        this.objects$ = new Observable<FakeObject[]>((observer:any) => this._dataObserver = observer).share();
        this._postOptions.appendHeaders('Content-Type', 'application/json');
    }

    loadAll() {
        if (typeof this._dataStore === 'undefined' || this._dataStore.objects.length == 0) {
            this._http.get(this._baseUrl)
                .map(this.extractData)
                .subscribe(data => {
                    this._dataStore.objects = data;
                    this._dataObserver.next(this._dataStore.objects);
                }, this.handleError
            );
        } else {
            this._dataObserver.next(this._dataStore.objects);
        }
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
        return this._http.post(this._baseUrl, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.push(data);
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError, this.handleCompleted
        );
    }

    update(object: any) {
        let body = JSON.stringify(object);
        return this._http.put(`${this._baseUrl}${object.id}/`, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === data.id) {
                        this._dataStore.objects[i] = data; }
                    });
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError, this.handleCompleted
        );
    }

    delete(id: number) {
        this._http.delete(`${this._baseUrl}${id}/`)
            .subscribe(response => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === id) { this._dataStore.objects.splice(i, 1); }
                });
                this._dataObserver.next(this._dataStore.objects);
            }, this.handleError, this.handleCompleted
        );
    }

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || body || { };
    }

    protected handleCompleted () {
        var message = jQuery('<div class="ui success message"><i class="close icon"></i></div>');
        message.append('<div class="header capitalize">success</div>');
        message.append('<p>Completed successfully</p>');
        jQuery('.wm-messages').append(message);
    }

    protected handleError (error: any) {
        console.log(error);
        let errMsg = error.message || 'Server error';
        return Observable.throw(errMsg);
    }

}
