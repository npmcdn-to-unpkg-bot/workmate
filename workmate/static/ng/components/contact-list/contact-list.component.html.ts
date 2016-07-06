export const htmlTemplate = `
<div class="row">
    <div class="col-sm-3">
        <div class="form-group has-feedback">
            <input #searchTerm class="form-control" placeholder="Search..." (keyup)="0">
            <span class="glyphicon glyphicon-search form-control-feedback"></span>
        </div>
        <div class="box box-solid">
            <div class="box-header with-border">
                <h3 class="box-title">Contacts</h3>
            </div>
            <div class="box-body no-padding">
                <ul class="nav nav-pills nav-stacked">
                    <li *ngFor="let contact of _contacts | async | contactSearch : searchTerm.value" (click)="selectContact(contact)">
                        <a href="#">{{ contact.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-9">
        <contact-detail *ngIf="_selectedContact" [contact]="_selectedContact | async"></contact-detail> 
    </div>
</div>
    
`