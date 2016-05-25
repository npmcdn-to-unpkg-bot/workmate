export const htmlTemplate = `

    <div class="item">
        <div class="content">
            <p class="cursor-pointer" (click)="toggle()">{{ story.title }}</p>
            <div class="extra">
                <div class="ui label"><i class="star icon"></i>{{ story.effort }}</div>
                <div class="ui label" *ngFor="let tag of story.tags">{{ tag.title }}</div>
                <button class="ui right floated mini button">Start</button>
            </div>
        </div>
    </div>
    <div class="ui secondary form segment" *ngIf="opened" story-detail [story]="story"></div>
`