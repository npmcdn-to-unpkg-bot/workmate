export const htmlTemplate = `

    <div class="row">
        <div class="col-sm-6">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Backlog</h3>
                    <div class="box-tools pull-right">
                        <a class="btn btn-box-tool" (click)="createNew(true)"><i class="fa fa-plus"></i></a>
                    </div>
                </div>
                <div class="box-body box-comments" *ngIf="_newBacklogOpened" >
                    <div class="box-comment" story-detail [story]="_newBacklogStory"></div>
                </div>
                <div class="box-body">
                    <ul class="story-list" style="min-height: 50px;" [dragula]='"first-bag"' [attr.data-list]="'backlog'">
                        <li class="story-list-item handle" *ngFor="let story of _stories | filter : {icebox: false}" [attr.data-id]="story.id" story-list-item [story]="story"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Icebox</h3>
                    <div class="box-tools pull-right">
                        <a class="btn btn-box-tool" (click)="createNew(false)"><i class="fa fa-plus"></i></a>
                    </div>
                </div>
                <div class="box-body box-comments" *ngIf="_newIceboxOpened">
                    <div class="box-comment" story-detail [story]="_newIceboxStory"></div>
                </div>
                <div class="box-body">
                    <ul class="story-list" style="min-height: 50px;" [dragula]='"first-bag"' [attr.data-list]="'icebox'">
                        <li class="story-list-item handle" *ngFor="let story of _stories | filter : {icebox: true}" [attr.data-id]="story.id" story-list-item [story]="story"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

`