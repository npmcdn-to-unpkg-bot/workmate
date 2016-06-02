export const htmlTemplate = `

    <div class="ui equal width grid">
        <div class="column">
            <div class="ui segment">
                <button class="ui mini compact right floated icon button" (click)="createNew(true)">
                    <i class="plus icon"></i>
                </button>
                <p>Backlog</p>
            </div>
            <div class="ui secondary form segment" *ngIf="newBacklogOpened" story-detail [story]="newBacklogStory"></div>
            <div class="ui raised segments" style="min-height: 50px;" [dragula]='"first-bag"' [attr.data-list]="'backlog'">
                <div class="ui segment" *ngFor="let story of stories | filter : {icebox: false}" [attr.data-id]="story.id" story-list-item [story]="story"></div>
            </div>
        </div>
        <div class="column">
            <div class="ui segment">
                <button class="ui mini compact right floated icon button" (click)="createNew(false)">
                    <i class="plus icon"></i>
                </button>
                <p>Icebox</p>
            </div>
            <div class="ui secondary form segment" *ngIf="newIceboxOpened" story-detail [story]="newIceboxStory"></div>
            <div class="ui raised segments" [dragula]='"first-bag"' style="min-height: 50px;" [attr.data-list]="'icebox'">
                <div class="ui segment" *ngFor="let story of stories | filter : {icebox: true}" [attr.data-id]="story.id" story-list-item [story]="story"></div>
            </div>
        </div>
    </div>

`