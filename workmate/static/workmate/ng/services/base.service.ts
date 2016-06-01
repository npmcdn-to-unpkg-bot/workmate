import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Alert }                                            from '../interfaces/alert';
import { AlertService }                                     from './alert.service';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';

declare var jQuery: any;


export class BaseService {

    meta$: Observable<Object>;
    objects$: Observable<any[]>;

    protected _metaObserver: Observer<Object>;
    protected _objectsObserver: Observer<any[]>;
    protected _dataStore: { objects: any[], meta: Object };
    protected _baseUrl = '';

    protected _postOptions = new ExRequestOptions();

    constructor (protected _http: Http, protected _alertService: AlertService) {
        this._dataStore = { objects: [], meta: {} };
        this.meta$ = new Observable<Object>((observer:any) => this._metaObserver = observer).share();
        this._postOptions.appendHeaders('Content-Type', 'application/json');
    }

    loadMeta() {
        if (typeof this._dataStore === 'undefined' || Object.keys(this._dataStore.meta).length == 0) {
            this._http.get(`${this._baseUrl}schema/`)
                .map(this.extractData)
                .subscribe(data => {
                    this._dataStore.meta = data;
                    this._metaObserver.next(this._dataStore.meta);
                }, err => this.handleError(err)
            );
        } else {
            this._metaObserver.next(this._dataStore.meta);
        }
    }

    loadAll() {
        if (typeof this._dataStore === 'undefined' || this._dataStore.objects.length == 0) {
            this._http.get(this._baseUrl)
                .map(this.extractData)
                .subscribe(data => {
                    this._dataStore.objects = data;
                    this._objectsObserver.next(this._dataStore.objects);
                }, err => this.handleError(err)
            );
        } else {
            this._objectsObserver.next(this._dataStore.objects);
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
                this._objectsObserver.next(this._dataStore.objects);
            }, err => this.handleError(err)
        );
    }

    create(object: any) {
        let body = JSON.stringify(object);
        return this._http.post(this._baseUrl, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.push(data);
                this._objectsObserver.next(this._dataStore.objects);
            }, err => this.handleError(err), () => this.handleCompleted()
        );
    }

    update(object: any) {
        let body = JSON.stringify(object);
        return this._http.put(`${this._baseUrl}${object.id}/`, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === data.id) {
                        this._dataStore.objects[i] = data;
                    }
                });
                this._objectsObserver.next(this._dataStore.objects);
            }, err => this.handleError(err), () => this.handleCompleted()
        );
    }

    delete(id: number) {
        this._http.delete(`${this._baseUrl}${id}/`)
            .subscribe(res => {
                this._dataStore.objects.forEach((item, i) => {
                    if (item.id === id) {
                        this._dataStore.objects.splice(i, 1);
                    }
                });
                this._objectsObserver.next(this._dataStore.objects);
            }, err => this.handleError(err), () => this.handleCompleted()
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
        this.createAlert('success', 'Completed successfully');
    }

    protected handleError (error: any) {
        let body = JSON.parse(error._body);
        let errMsg = body['error_message'] || 'An unknown server error occurred.';
        this.createAlert('error', errMsg);
        return Observable.throw(errMsg);
    }

    protected createAlert(type: string, message: string) {
        this._alertService.createAlert(new Alert({type: type, message: message}));
    }

}
