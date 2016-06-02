import { iStoryState }                  from './story_state';
import { iStoryTask }                   from './story_task';
import { iStoryType }                   from './story_type';
import { iTag }                         from './tag';


export interface iStory {
    id?: number;
    description?: string;
    effort?: number;
    icebox?: boolean;
    state: iStoryState;
    tags?: iTag[];
    tasks?: iStoryTask[];
    title: string;
    type: iStoryType;
    resource_uri?: string;
}

export class Story implements iStory {
    description: string;
    effort: number;
    icebox: boolean;
    state: iStoryState;
    tags: iTag[];
    tasks: iStoryTask[];
    title: string;
    type: iStoryType;

    constructor(options: iStory) {
        this.description = options.description;
        this.icebox = options.icebox;
        this.title = options.title;
        this.state = options.state;
        this.tags = options.tags || [];
        this.tasks = options.tasks || [];
        this.type = options.type;
    }
}
