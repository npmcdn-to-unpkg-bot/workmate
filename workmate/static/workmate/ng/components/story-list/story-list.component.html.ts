export const htmlTemplate = `

    <div class="ui segment">
        <button class="ui mini compact right floated icon button" (click)="newStory()"><i class="plus icon"></i></button>
        <p>{{ title }}</p>
    </div>
    <div class="ui segment" *ngFor="let story of stories" story-list-item [story]="story"></div>
    
`