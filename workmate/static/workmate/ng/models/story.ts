import { Tag }                      from './tag';


export class StoryTask {
    id: number;
    completed: boolean;
    description: string;
    resource_uri: string;
}

export class StoryType {
    id: number;
    title: string;
    resource_uri: string;
}

export class StoryState {
    id: number;
    title: string;
    resource_uri: string;
}

export class Story {
    id: number;
    title: string;
    description: string;
    effort: number;
    state: StoryState;
    tags: Tag[];
    tasks: StoryTask[];
    type: StoryType;
    resource_uri: string;

    constructor() {
        this.title = 'New Story';
        this.state = null;
        this.tags = [];
        this.tasks = [];
        this.type = null;
    }
}
