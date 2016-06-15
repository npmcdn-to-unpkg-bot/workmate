export const htmlTemplate = `

    <hr/>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.title}">
        <textarea class="form-control" [(ngModel)]="story.title" rows="2"></textarea>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.type}">
        <label>Type</label>
        <bs-select [(ngModel)]="story.type" [choices]="_types" [textLabel]="'title'"></bs-select>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.effort}">
        <label>Effort</label>
        <bs-select [(ngModel)]="story.effort" [choices]="_StoryService.effortChoices" [textLabel]="'text'" [boundValueAttr]="'id'"></bs-select>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.state}">
        <label>State</label>
        <bs-select [(ngModel)]="story.state" [choices]="_states" [textLabel]="'title'"></bs-select>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.description}">
        <label>Description</label>
        <textarea class="form-control" [(ngModel)]="story.description" rows="3"></textarea>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.tags}">
        <label>Tags</label>
        <bs-select-multiple [(ngModel)]="story.tags" [choices]="_tags" [textLabel]="'title'"></bs-select-multiple>
    </div>
    <div class="form-group" [ngClass]="{'has-error': story._validation_errors?.tasks}">
        <label>Tasks</label>
        <div class="form-group" *ngFor="let task of story.tasks">
            <i class="fa fa-checkmark" [ngClass]="{'green': task.completed}" (click)="task.completed = !task.completed"></i>
            <input class="form-control" [(ngModel)]="task.description">
        </div>
    </div>
    <button class="btn btn-flat" (click)="addTask()">Add Task</button>
    <button *ngIf="story.id" class="btn btn-flat" (click)="delete()">Delete</button>
    <button class="btn btn-primary btn-flat" (click)="save()">Save</button>
`