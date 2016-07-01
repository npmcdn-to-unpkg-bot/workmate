export const htmlTemplate = `

    <div class="tools">
        <i class="fa fa-edit" (click)="toggle()"></i>
    </div>
    <span class="{{story.type.icon}}"></span>
    <span class="description">{{ story.title }}</span>
    <div class="text text-muted" *ngIf="story.effort">Effort: {{ story.effort }}</div>
    <div class="form" *ngIf="_opened" story-detail [story]="story"></div>
    
`