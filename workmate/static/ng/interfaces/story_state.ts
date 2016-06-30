export interface iStoryState {
    id?: number;
    order?: number;
    title: string;
    resource_uri?: string;

    _validation_errors?: Object;
}

export class StoryState {
    title: string;

    constructor(options: iStoryState) {
        this.title = options.title;
    }
}
