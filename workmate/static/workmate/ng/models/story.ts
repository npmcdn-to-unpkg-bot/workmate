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
    description: string;
    effort: number;
    state: StoryState;
    tags: Tag[];
    tasks: StoryTask[];
    title: string;
    type: StoryType;
    resource_uri: string;
}