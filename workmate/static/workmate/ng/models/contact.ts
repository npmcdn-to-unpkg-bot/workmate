import { Tag }                      from './tag';


export class Contact {
    absolute_url: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    code: string;
    color: string;
    email_address: string;
    first_name: string;
    home_number: string;
    id: number;
    last_name: string;
    mobile_number: string;
    name: string;
    notes: string;
    resource_uri: string;
    state: string;
    tags: Tag[];
    website: string;
    work_number: string;
}