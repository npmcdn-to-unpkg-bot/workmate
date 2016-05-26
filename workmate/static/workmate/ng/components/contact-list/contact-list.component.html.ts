export const htmlTemplate = `

<div class="ui divided grid">
    <div class="six wide column">
        <div class="ui basic segment">
            <div class="item">
                <div class="ui fluid icon input">
                    <input #term (keyup)="search(term.value)" class="prompt" placeholder="Search...">
                    <i class="search icon"></i>
                </div>
            </div>
            <div class="ui divided link items">
                <div class="item" *ngFor="let contact of contacts | async" (click)="onSelect(contact)">
                    <div class="ui tiny image">
                      <img src="http://semantic-ui.com/images/wireframe/image.png">
                    </div>
                    <div class="middle aligned content">
                        <div class="header">{{ contact.name }}</div>
                        <div class="meta">
                            <span>{{ contact.email_address }}</span>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    <div class="ten wide column">
        <div class="ui basic segment">
            <contact-detail *ngIf="selectedContact" [contact]="selectedContact"></contact-detail>
        </div>
    </div>
</div>
    
`