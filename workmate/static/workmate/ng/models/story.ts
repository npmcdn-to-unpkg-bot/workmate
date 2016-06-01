import { iTag }                      from './tag';


export interface iStoryTask {
    id?: number;
    completed?: boolean;
    description: string;
    resource_uri?: string;
}

export class StoryTask implements iStoryTask {
    completed: boolean;
    description: string;

    constructor(options: iStoryTask) {
        this.completed = options.completed;
        this.description = options.description;
    }
}

export interface iStoryType {
    id?: number;
    title: string;
    resource_uri?: string;
}

export class StoryType implements iStoryType {
    title: string;

    constructor(options: iStoryType) {
        this.title = options.title;
    }
}

export interface iStoryState {
    id?: number;
    title: string;
    resource_uri?: string;
}

export class StoryState {
    title: string;

    constructor(options: iStoryType) {
        this.title = options.title;
    }
}

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
        this.title = options.title || 'New Story';
        this.description = options.description;
        this.state = options.state;
        this.tags = options.tags || [];
        this.tasks = options.tasks || [];
        this.type = options.type;
    }
}
