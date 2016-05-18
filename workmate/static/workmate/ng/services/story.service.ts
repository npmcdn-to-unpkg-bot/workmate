import { Injectable }               from '@angular/core';

import { STORIES }                  from '../models/mock-stories';


@Injectable()
export class StoryService {

    getStories() {
        return Promise.resolve(STORIES);
    }

}