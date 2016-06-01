import { iStoryState }                  from './story_state';
import { iStoryTask }                   from './story_task';
import { iStoryType }                   from './story_type';
import { iTag }                         from './tag';


export interface iStory {
    id?: number;
    title: string;
    description?: string;
    effort?: number;
    state: iStoryState;
    tags?: iTag[];
    tasks?: iStoryTask[];
    type: iStoryType;
    resource_uri?: string;
}

export class Story implements iStory {
    title: string;
    description: string;
    effort: number;
    state: iStoryState;
    tags: iTag[];
    tasks: iStoryTask[];
    type: iStoryType;

    constructor(options: iStory) {
        this.title = options.title;
        this.description = options.description;
        this.state = options.state;
        this.tags = options.tags || [];
        this.tasks = options.tasks || [];
        this.type = options.type;
    }
}
