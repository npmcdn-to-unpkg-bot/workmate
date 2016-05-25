export const htmlTemplate = `

    <div class="ui equal width grid">
        <div class="column">
            <div class="ui raised segments">
                <div class="ui segment">
                    <button class="ui mini compact right floated icon button" (click)="createNew(true)">
                        <i class="plus icon"></i>
                    </button>
                    <p>Backlog</p>
                </div>
                <div class="ui secondary form segment" *ngIf="newBacklogOpened" story-detail [story]="newBacklogStory"></div>
                <div class="ui segment" *ngFor="let story of stories | async" story-list-item [story]="story"></div>
            </div>
        </div>
        <div class="column">
            <div class="ui raised segments">
                <div class="ui segment">
                    <button class="ui mini compact right floated icon button" (click)="createNew(false)">
                        <i class="plus icon"></i>
                    </button>
                    <p>Icebox</p>
                </div>
                <div class="ui secondary form segment" *ngIf="newIceboxOpened" story-detail [story]="newIceboxStory"></div>
                <div class="ui segment" *ngFor="let story of stories | async" story-list-item [story]="story"></div>
            </div>
        </div>
    </div>

`