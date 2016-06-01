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
