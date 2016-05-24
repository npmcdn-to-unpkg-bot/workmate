export const htmlTemplate = `

    <div class="ui equal width grid">
        <div class="column">
            <div class="ui raised segments">
                <div class="ui segment">
                    <button class="ui mini compact right floated icon button" (click)="createNew()">
                        <i class="plus icon"></i>
                    </button>
                    <p>Backlog</p>
                </div>
                <div class="ui segment" *ngIf="opened" story-list-item [story]="newStory"></div>
                <div class="ui segment" *ngFor="let story of stories | async" story-list-item [story]="story"></div>
            </div>
        </div>
        <div class="column">
            <div class="ui raised segments">
                <div class="ui segment">
                    <button class="ui mini compact right floated icon button" (click)="createNew()">
                        <i class="plus icon"></i>
                    </button>
                    <p>Icebox</p>
                </div>
                <div class="ui segment" *ngIf="opened" story-list-item [story]="newStory"></div>
                <div class="ui segment" *ngFor="let story of stories | async" story-list-item [story]="story"></div>
            </div>
        </div>
    </div>

`