import { Injectable }                                       from '@angular/core';
import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Story, StoryState, StoryType }                     from '../models/story';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class StoryService {

    states$: Observable<StoryState[]>;
    stories$: Observable<Story[]>;
    types$: Observable<StoryType[]>;

    private _statesObserver: Observer<StoryState[]>;
    private _storiesObserver: Observer<Story[]>;
    private _typesObserver: Observer<StoryType[]>;

    private _dataStore: { states: StoryState[], stories: Story[], types: StoryType[] };

    private postOptions = new ExRequestOptions();

    constructor (private _http: Http) {
        this._dataStore = { states: [], stories: [], types: [] };
        this.states$ = new Observable<StoryState[]>((observer:any) => this._statesObserver = observer).share();
        this.stories$ = new Observable<Story[]>((observer:any) => this._storiesObserver = observer).share();
        this.types$ = new Observable<StoryType[]>((observer:any) => this._typesObserver = observer).share();
        this.postOptions.appendHeaders('Content-Type', 'application/json');
    }

    private baseUrl = '/api/v1/story/';

    loadAll() {
        this._http.get(this.baseUrl)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.stories = data;
                this._storiesObserver.next(this._dataStore.stories);
            }, this.handleError
        );
    }
    
    load(id: any) {
        this._http.get(`${this.baseUrl}${id}/`)
            .map(this.extractData)
            .subscribe(data => {
                let found = false;
                this._dataStore.stories.forEach((item, index) => {
                    if(item.id === data.id) {
                        this._dataStore.stories[index] = data;
                        found = true;
                    }
                });
                if (!found) {
                    this._dataStore.stories.push(data);
                }
                this._storiesObserver.next(this._dataStore.stories);
            }, this.handleError
        );
    }

    loadAllStates() {
        this._http.get('/api/v1/story_state/')
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.states = data;
                this._statesObserver.next(this._dataStore.states);
            }, this.handleError
        );
    }

    loadAllTypes() {
        this._http.get('/api/v1/story_type/')
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.types = data;
                this._typesObserver.next(this._dataStore.types);
            }, this.handleError
        );
    }

    create(object: Story) {
        let body = JSON.stringify(object);
        this._http.post(this.baseUrl, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.stories.push(data);
                this._storiesObserver.next(this._dataStore.stories);
            }, this.handleError
        );
    }

    update(object: Story) {
        let body = JSON.stringify(object);
        this._http.put(`${this.baseUrl}${object.id}/`, body, this.postOptions)
            .map(this.extractData)
            .subscribe(data => {
                this._dataStore.stories.forEach((story, i) => {
                    if (story.id === data.id) {
                        this._dataStore.stories[i] = data; }
                    });
                this._storiesObserver.next(this._dataStore.stories);
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
