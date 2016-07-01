import { iStoryState }                  from './story_state';
import { iStoryTask }                   from './story_task';
import { iStoryType }                   from './story_type';
import { iTag }                         from './tag';


export interface iStory {
    id?: number;
    created_by?: string;
    created_on?: string;
    description?: string;
    effort?: number;
    last_modified_by?: string;
    last_modified_on?: string;
    order?: number;
    state: iStoryState;
    tags?: iTag[];
    tasks?: iStoryTask[];
    title: string;
    type: iStoryType;
    resource_uri?: string;

    _validation_errors?: Object;
}

export class Story implements iStory {
    description: string;
    effort: number;
    order: number;
    state: iStoryState;
    tags: iTag[];
    tasks: iStoryTask[];
    title: string;
    type: iStoryType;

    constructor(options: iStory) {
        this.description = options.description;
        this.title = options.title;
        this.state = options.state;
        this.tags = options.tags || [];
        this.tasks = options.tasks || [];
        this.type = options.type;
    }
}
