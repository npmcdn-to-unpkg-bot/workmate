export interface iStoryType {
    id?: number;
    title: string;
    resource_uri?: string;

    _validation_errors?: Object;
}

export class StoryType implements iStoryType {
    title: string;

    constructor(options: iStoryType) {
        this.title = options.title;
    }
}
