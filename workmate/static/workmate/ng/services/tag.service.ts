import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';

import { Tag }                      from '../models/tag';

import { Observable }               from 'rxjs/Observable';


@Injectable()
export class TagService {

    constructor (private http: Http) {}

    private tagsUrl = 'api/v1/tag';

    getTags(): Observable<Tag[]> {
        return this.http
            .get(this.tagsUrl)
            .map(this.extractData)
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
        return Observable.throw(errMsg);
    }

}
