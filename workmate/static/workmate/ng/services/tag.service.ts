import { Injectable }               from '@angular/core';
import { Http, Response }           from '@angular/http';

import { Tag }                      from '../models/tag';


@Injectable()
export class TagService {

    constructor (private http: Http) {}

    private tagsUrl = 'api/v1/tag';

    getTags(): Promise<Tag[]> {
        return this.http
            .get(this.tagsUrl)
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
