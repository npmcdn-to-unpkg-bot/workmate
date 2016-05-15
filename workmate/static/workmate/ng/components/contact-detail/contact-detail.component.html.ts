export const htmlTemplate = `

    <div class="ui padded segment">
    
        <h4 class="ui header">
            <a href="{{ contact.absolute_url }}">{{ contact.name }}</a>
        </h4>
    
        <p *ngIf="contact.notes">{{ contact.notes }}</p>
    
        <div class="ui relaxed middle aligned list">
            <div class="item" *ngIf="contact.mobile_number">
                <i class="circular mobile icon"></i>
                <div class="content">
                    <span>{{ contact.mobile_number }}</span>
                    <i [attr.data-id]="contact.id" class="teal link large call icon" data-action="contact_call" data-type="mobile_number"></i>
                </div>
            </div>
            <div class="item" *ngIf="contact.home_number">
                <i class="circular home icon"></i>
                <div class="content">
                    <span data-bind="text: home_number">{{ contact.home_number }}</span>
                    <i [attr.data-id]="contact.id" class="teal link large call icon" data-action="contact_call" data-type="home_number"></i>
                </div>
            </div>
            <div class="item" *ngIf="contact.work_number">
                <i class="circular building icon"></i>
                <div class="content">
                    <span data-bind="text: work_number">{{ contact.work_number }}</span>
                    <i [attr.data-id]="contact.id" class="teal link large call icon" data-action="contact_call" data-type="work_number"></i>
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
    
    </div>
`