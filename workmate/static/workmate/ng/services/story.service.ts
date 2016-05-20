import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';

import { Story }                  from '../models/story';


@Injectable()
export class StoryService {

    constructor (private http: Http) {}

    private storiesUrl = 'api/v1/story';

    getStories(): Promise<Story[]> {
        return this.http
            .get(this.storiesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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
        return Promise.reject(errMsg);
    }

}
