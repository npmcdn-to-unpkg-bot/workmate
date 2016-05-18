export const htmlTemplate = `

    <div class="item">
        <div class="content">
            <p (click)="toggle()">{{ story.title }}</p>
            <div class="extra">
                <div class="ui label"><i class="star icon"></i>{{ story.effort }}</div>
                <div class="ui label">Some useful tag</div>
                <button class="ui right floated mini button">Start</button>
            </div>
        </div>
    </div>
    <div class="ui segment" *ngIf="open" story-detail [story]="story"></div>
`