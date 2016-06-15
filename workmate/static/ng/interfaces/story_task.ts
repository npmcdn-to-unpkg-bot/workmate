export interface iStoryTask {
    id?: number;
    completed?: boolean;
    description: string;
    resource_uri?: string;

    _validation_errors?: Object;
}

export class StoryTask implements iStoryTask {
    completed: boolean;
    description: string;

    constructor(options: iStoryTask) {
        this.completed = options.completed;
        this.description = options.description;
    }
}
