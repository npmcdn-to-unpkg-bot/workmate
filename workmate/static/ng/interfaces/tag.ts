export interface iTag {
    id?: number;
    resource_uri?: string;
    title: string;

    _validation_errors?: Object;
}

export class Tag implements iTag {
    title: string;

    constructor(options: iTag) {
        this.title = options.title;
    }
}