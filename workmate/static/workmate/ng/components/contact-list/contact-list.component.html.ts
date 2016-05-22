export const htmlTemplate = `

    <div class="ui search">
        <div class="ui icon input">
            <input #term (keyup)="search(term.value)" class="prompt" placeholder="Search...">
            <i class="search icon"></i>
        </div>
    </div>
    
    <div class="ui hidden clearing divider"></div>
    
    <ul class="ui list">
      <li *ngFor="let contact of contacts | async">
          <a href="javascript:void(0)" (click)="onSelect(contact)">{{ contact.name }}</a>
      </li>
    </ul>
    
    <contact-detail *ngIf="selectedContact" [contact]="selectedContact"></contact-detail>
    
    <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
    
`