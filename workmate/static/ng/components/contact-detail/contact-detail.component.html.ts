export const htmlTemplate = `
    
    <div class="box box box-widget" *ngIf="contact">
        <div class="box-header with-border">
            <h3 class="box-title">{{ contact.name }}</h3>
            <div class="box-tools pull-right">
                <a class="btn btn-box-tool" href="{{ contact.absolute_url }}"><i class="fa fa-pencil"></i></a>
            </div>
        </div>
        <div class="box-body" *ngIf="contact.mobile_number || contact.home_number || contact.work_number">
            <button *ngIf="contact.mobile_number" class="btn btn-flat" (click)="call('mobile_number')">
                Call on Mobile
            </button>
            <button *ngIf="contact.home_number" class="btn btn-flat" (click)="call('home_number')">
                Call at Home
            </button>
            <button *ngIf="contact.work_number" class="btn btn-flat" (click)="call('work_number')">
                Call at Work
            </button>
        </div>
        <div class="box-body box-comments" *ngIf="contact.notes">
            <div class="box-comment">{{ contact.notes }}</div>
        </div>
        <div class="box-body no-padding">
            <ul class="nav nav-pills nav-stacked">
                <li *ngIf="contact.mobile_number"><a>Mobile : {{ contact.mobile_number }}</a></li>
                <li *ngIf="contact.home_number"><a>Home : {{ contact.home_number }}</a></li>
                <li *ngIf="contact.work_number"><a>Work : {{ contact.work_number }}</a></li>
                <li *ngIf="contact.email_address"><a href="mailto:{{ contact.email_address }}">Email : {{ contact.email_address }}</a></li>
                <li *ngIf="contact.website"><a href="{{ contact.website }}" target="_blank">Website : {{ contact.website }}</a></li>
                <li *ngIf="contact.address"><a href="http://maps.google.com/?q={{ contact.address }}" target="_blank">Address : {{ contact.address }}</a></li>
                <li *ngIf="contact.tags.length > 0">
                    <a>Tags : <span *ngFor="let tag of contact.tags"><span class="label label-default">{{ tag.title }}</span>&nbsp;&nbsp;&nbsp;</span></a>
                </li>
            </ul>
        </div>
    </div>
    
`