export interface iAlert {
    id?: number;
    type: string;
    message: string;
    dismissable?: boolean;
    dismissOnTimeout?: number;

}

export class Alert implements iAlert {
    type: string;
    message: string;
    dismissable: boolean;
    dismissOnTimeout: number;

    constructor(options: iAlert) {
        this.type = options.type;
        this.message = options.message;
        this.dismissable = options.dismissable || true;
        this.dismissOnTimeout = options.dismissOnTimeout || 5000;
    }

}