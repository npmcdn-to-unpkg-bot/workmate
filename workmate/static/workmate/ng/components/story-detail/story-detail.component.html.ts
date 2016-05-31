export const htmlTemplate = `

    <div class="field">
        <label>
            <div class="ui label">ID<div class="detail">{{ story.id }}</div></div>
        </label>
        <div class="ui small input">
            <textarea [(ngModel)]="story.title" rows="2"></textarea>
        </div>
    </div>
    <div class="inline field">
        <label>Type</label>
        <div sm-select class="ui right floated small input" [(ngModel)]="story.type" [choices]="types" [choiceLabel]="'title'"></div>
    </div>
    <div class="ui hidden clearing divider"></div>
    <div class="inline field">
        <label>Effort</label>
        <div sm-select class="ui right floated small input" [(ngModel)]="story.effort" [choices]="storyService.effortChoices" [choiceLabel]="'label'" [choiceValue]="'value'"></div>
    </div>
    <div class="ui hidden clearing divider"></div>
    <div class="inline field">
        <label>State</label>
        <div sm-select class="ui right floated small input" [(ngModel)]="story.state" [choices]="states" [choiceLabel]="'title'"></div>
    </div>
    <div class="ui hidden clearing divider"></div>  
    <div class="field">
        <label>Description</label>
        <div class="ui small input">
            <textarea [(ngModel)]="story.description" rows="3"></textarea>
        </div>
    </div>
    <div class="field">
        <label>Tags</label>
        <div sm-select-multiple class="ui small input" [(ngModel)]="story.tags" [choices]="tags" [choiceLabel]="'title'" [addedClass]="'fluid'"></div>
    </div>
    <div class="field">
        <label>Tasks</label>
        <div class="field" *ngFor="let task of story.tasks">
            <div class="ui small fluid left icon input">
                <i class="inverted circular checkmark link icon" [ngClass]="{'green': task.completed}" (click)="task.completed = !task.completed"></i>
                <input [(ngModel)]="task.description">
            </div>
        </div>
    </div>
    <button class="ui right floated mini button" (click)="addTask()">Add Task</button>
    <div class="ui hidden clearing divider"></div>
    <button *ngIf="story.id" class="ui secondary button" (click)="delete()">Delete</button>
    <button class="ui right floated primary button" (click)="save()">Save</button>
    <div class="ui hidden clearing divider"></div>
`