export const htmlTemplate = `
    
    <h1 class="ui header">
        <i class="user icon"></i>
        <div class="content">
            <a href="{{ contact.absolute_url }}">{{ contact.name }}</a>
            
        </div>
    </h1>
    
    <div class="ui divider"></div>
    
    <button *ngIf="contact.mobile_number" class="ui basic tiny icon button" [attr.data-id]="contact.id" data-action="contact_call" data-type="mobile_number">
        <i class="call icon"></i>
        Call on Mobile
    </button>
    <button *ngIf="contact.home_number" class="ui basic tiny icon button" [attr.data-id]="contact.id" data-action="contact_call" data-type="home_number">
        <i class="call icon"></i>
        Call at Home
    </button>
    <button *ngIf="contact.work_number" class="ui basic tiny icon button" [attr.data-id]="contact.id" data-action="contact_call" data-type="work_number">
        <i class="call icon"></i>
        Call at Work
    </button>
    
    <div class="ui hidden divider"></div>
    
    <p *ngIf="contact.notes">{{ contact.notes }}</p>

    <div class="ui relaxed middle aligned list">
        <div class="item" *ngIf="contact.mobile_number">
            <i class="circular mobile icon"></i>
            <div class="content">
                <span>{{ contact.mobile_number }}</span>
            </div>
        </div>
        <div class="item" *ngIf="contact.home_number">
            <i class="circular home icon"></i>
            <div class="content">
                <span>{{ contact.home_number }}</span>
            </div>
        </div>
        <div class="item" *ngIf="contact.work_number">
            <i class="circular building icon"></i>
            <div class="content">
                <span>{{ contact.work_number }}</span>
            </div>
        </div>
        <div class="item" *ngIf="contact.email_address">
            <i class="circular at icon"></i>
            <div class="content">
                <a href="mailto:{{ contact.email_address }}">{{ contact.email_address }}</a>
            </div>
        </div>
        <div class="item" *ngIf="contact.website">
            <i class="circular world icon"></i>
            <div class="content">
                <a href="{{ contact.website }}" target="_blank">{{ contact.website }}</a>
            </div>
        </div>
        <div class="item" *ngIf="contact.address">
            <i class="circular marker icon"></i>
            <div class="content">
                <a href="http://maps.google.com/?q={{ contact.address }}" target="_blank" >{{ contact.address }}</a>
            </div>
        </div>
    </div>
    <div class="ui divider" *ngIf="contact.tags.length > 0"></div>
    <div class="ui small tag label" *ngFor="let tag of contact.tags">{{ tag.title }}</div>
    
`