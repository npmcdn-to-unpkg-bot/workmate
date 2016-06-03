import { iTag }                      from './tag';


export interface iContact {
    absolute_url?: string;
    address?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    code?: string;
    color?: string;
    email_address?: string;
    first_name: string;
    home_number?: string;
    id?: number;
    last_name: string;
    mobile_number?: string;
    name?: string;
    notes?: string;
    resource_uri?: string;
    state?: string;
    tags?: iTag[];
    website?: string;
    work_number?: string;

    _validation_errors?: Object;
}

export class Contact implements iContact {
    address_line_1: string;
    address_line_2: string;
    city: string;
    code: string;
    email_address: string;
    first_name: string;
    home_number: string;
    last_name: string;
    mobile_number: string;
    notes: string;
    state: string;
    tags: iTag[];
    website: string;
    work_number: string;

    constructor(options: iContact) {
        this.address_line_1 = options.address_line_1;
        this.address_line_2 = options.address_line_2;
        this.city = options.city;
        this.code = options.code;
        this.email_address = options.email_address;
        this.first_name = options.first_name;
        this.home_number = options.home_number;
        this.last_name = options.last_name;
        this.mobile_number = options.mobile_number;
        this.notes = options.notes;
        this.state = options.state;
        this.tags = options.tags || [];
        this.website = options.website;
        this.work_number = options.work_number;
    }
}