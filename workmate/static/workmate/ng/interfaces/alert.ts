export interface iAlert {
    id?: number;
    type: string;
    message: string;
    dismissable?: boolean;
    dismissDefaultTimeout?: number;
    dismissErrorTimeout?: number;
}

export class Alert implements iAlert {
    type: string;
    message: string;
    dismissable: boolean;
    dismissDefaultTimeout: number;
    dismissErrorTimeout: number;

    constructor(options: iAlert) {
        this.type = options.type;
        this.message = options.message;
        this.dismissable = options.dismissable == null ? true : options.dismissable;
        this.dismissDefaultTimeout = options.dismissDefaultTimeout || 5000;
        this.dismissErrorTimeout = options.dismissErrorTimeout || 10000;
    }

}