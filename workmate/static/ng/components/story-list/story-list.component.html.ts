export const htmlTemplate = `
    <div class="flex-container" *ngIf="_states">
        <div class="flex-1 margin-lr-2" *ngFor="let state of _states | async">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">{{state.title}}</h3>
                    <div class="box-tools pull-right">
                        <a class="btn btn-box-tool" (click)="createNew(state)"><i class="fa fa-plus"></i></a>
                    </div>
                </div>
                <div class="box-body box-comments" *ngIf="_newStory?.state == state">
                    <div class="box-comment" story-detail [story]="_newStory"></div>
                </div>
                <div class="box-body" *ngIf="_storiesByState[state.id]">
                    <ul class="story-list" style="min-height: 50px;" dnd-sortable-container [dropZones]="['story-zone']" [sortableData]="_storiesByState[state.id]">
                        <li class="story-list-item handle" *ngFor="let story of _storiesByState[state.id]; let i = index" dnd-sortable [sortableIndex]="i" (onDropSuccess)="moveStory(story, i, state)" story-list-item [story]="story"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`