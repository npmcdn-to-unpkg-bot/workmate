import { Injectable }                                       from '@angular/core';
import { Http, Response }                                   from '@angular/http';

import { ExRequestOptions }                                 from '../transportBoxes/exRequestOptions';
import { Story, StoryState, StoryType }                     from '../models/story';

import { Observable }                                       from 'rxjs/Observable';


@Injectable()
export class StoryService {

    constructor (private http: Http) {}

    private storiesUrl = '/api/v1/story/';
    private statesUrl = '/api/v1/story_state/';
    private typesUrl = '/api/v1/story_type/';

    getStories(): Observable<Story[]> {
        return this.http
            .get(this.storiesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getStates(): Observable<StoryState[]> {
        return this.http
            .get(this.statesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTypes(): Observable<StoryType[]> {
        return this.http
            .get(this.typesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveStory(story: Story): Observable<Story> {
        let body = JSON.stringify(story);
        let options = new ExRequestOptions();
        options.appendHeaders('Content-Type', 'application/json');
        if (story.id) {
            return this.http.put(this.storiesUrl + story.id + '/', body, options)
                            .map(this.extractData)
                            .catch(this.handleError);
        } else {
            return this.http.post(this.storiesUrl, body, options)
                            .map(this.extractData)
                            .catch(this.handleError);
        }
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.object || body.objects || { };
    }

    private handleError (error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
