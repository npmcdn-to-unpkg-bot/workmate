export interface iTag {
    id?: number;
    resource_uri?: string;
    title: string;
}

export class Tag implements iTag {
    title: string;

    constructor(options: iTag) {
        this.title = options.title;
    }
}