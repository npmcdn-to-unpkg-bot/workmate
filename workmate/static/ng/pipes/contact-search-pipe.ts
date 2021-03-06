import { Pipe, PipeTransform }                  from "@angular/core";

import { iContact }                             from '../interfaces/contact';


@Pipe({
    name: "contactSearch",
    pure: false
})

export class ContactSearchPipe implements PipeTransform {
    transform(value:any, term:string): any {
        if (term.length == 0) return value;
        let filters = term.toLocaleLowerCase().split(' ');
        let output = value;
        filters.forEach((item, i) => {
            output = output.filter(
                (contact:iContact) => (
                    contact.name.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.email_address.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.address.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.home_number.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.mobile_number.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.work_number.toLocaleLowerCase().indexOf(item) != -1 ||
                    contact.website.toLocaleLowerCase().indexOf(item) != -1
                )
            )
        });
        return output;
    }
}