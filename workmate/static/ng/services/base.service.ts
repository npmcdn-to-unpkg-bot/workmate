import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Alert }                                            from '../interfaces/alert';
import { AlertService }                                     from './alert.service';

import { Observable }                                       from 'rxjs/Observable';
import { Subject }                                          from 'rxjs/Subject';
import { $WebSocket }                                       from 'angular2-websocket/angular2-websocket';


declare var socket_url:any;


export class BaseService {

    protected _objects$: Subject<any[]>;
    protected _meta$: Subject<Object>;
    protected _dataStore: {
        meta: Object,
        objects: any[]
    };
    protected _baseUrl: string;
    protected _resourceName: string;
    protected _modelClass: string;
    protected _postOptions = new ExRequestOptions();
    protected _ws = new $WebSocket(`${socket_url}/data_notifications/`);

    constructor (protected _http: Http, protected _AlertService: AlertService) {
        this._meta$ = <Subject<Object>>new Subject();
        this._dataStore = {
            meta: {},
            objects: []
        };
        this._postOptions.appendHeaders('Content-Type', 'application/json');
        this._ws.connect();
        this._ws.onMessage((message:any) => this.handleDataNotification(message), {});
    }

    get meta$() {
        return this._meta$.asObservable();
    }

    get objects$() {
        return this._objects$.asObservable();
    }

    loadMeta() {
        if (typeof this._dataStore === 'undefined' || Object.keys(this._dataStore.meta).length == 0) {
            this._http.get(`${this._baseUrl}schema/`)
                .map(this.extractData)
                .subscribe(data => {
                    this._dataStore.meta = data;
                    this._meta$.next(this._dataStore.meta);
                }, err => this.handleError(err)
            );
        } else {
            this._meta$.next(this._dataStore.meta);
        }
    }

    loadAll() {
        if (typeof this._dataStore === 'undefined' || this._dataStore.objects.length == 0) {
            this._http.get(this._baseUrl)
                .map(this.extractData)
                .subscribe(data => {
                    this._dataStore.objects = data;
                    this._objects$.next(this._dataStore.objects);
                }, err => this.handleError(err)
            );
        } else {
            this._objects$.next(this._dataStore.objects);
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
                this._objects$.next(this._dataStore.objects);
            }, err => this.handleError(err)
        );
    }

    create(object: any) {
        let body = JSON.stringify(object);
        return this._http.post(this._baseUrl, body, this._postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.objects.push(data);
                this._objects$.next(this._dataStore.objects);
            }, err => this.handleError(err, object), () => this.handleCompleted()
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
                        this._dataStore.objects[i]._validation_errors = {};
                    }
                });
                this._objects$.next(this._dataStore.objects);
            }, err => this.handleError(err, object), () => this.handleCompleted()
        );
    }

    delete(id: number) {
        this._http.delete(`${this._baseUrl}${id}/`)
            .subscribe(res => {
                this.removeObject(id);
            }, err => this.handleError(err), () => this.handleCompleted()
        );
    }

    protected handleDataNotification(message: any) {
        let data = JSON.parse(message.data);
        if (data.model === this._modelClass) {
            if (data.type === 'post_save') this.load(data.pk);
            if (data.type === 'post_delete') this.removeObject(data.pk);
        }
    }

    protected removeObject(id: number) {
        this._dataStore.objects.forEach((item, i) => {
            if (item.id === id) {
                this._dataStore.objects.splice(i, 1);
            }
        });
        this._objects$.next(this._dataStore.objects);
    }

    protected extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || body || { };
    }

    protected handleCompleted (message?: string) {
        this.createAlert('success', message || 'Completed successfully');
    }

    protected handleError (error: any, object?: any) {
        let body = JSON.parse(error._body);
        let errorMesssage = '';
        if (object && body.hasOwnProperty(this._resourceName)) {
            object._validation_errors = body[this._resourceName];
            errorMesssage = 'The data failed validation, please fix any issues and re-submit.'
        } else {
            errorMesssage = body['message'] || body['error_message'] || 'An unknown server error occurred.';
        }
        this.createAlert('error', errorMesssage);
        return Observable.throw(errorMesssage);
    }

    protected createAlert(type: string, message: string) {
        this._AlertService.createAlert(new Alert({type: type, message: message}));
    }

}