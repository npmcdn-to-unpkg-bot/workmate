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
        <div class="ui right floated small input">
            <div class="ui selection dropdown">
                <i class="dropdown icon"></i><div class="text">{{story.type.title}}</div>
                <div class="menu transition hidden">
                    <div class="item" *ngFor="let type of types | async" (click)="story.type=type">{{type.title}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui hidden clearing divider"></div>
    <div class="inline field">
        <label>Effort</label>
        <div class="ui right floated small input">
            <select [(ngModel)]="story.effort" class="ui dropdown">
                <option value="0.5">0.5 Points</option>
                <option value="1.0">1 Point</option>
                <option value="2.0">2 Points</option>
                <option value="3.0">3 Points</option>
                <option value="5.0">5 Points</option>
            </select>
        </div>
    </div>
    <div class="ui hidden clearing divider"></div>
    <div class="inline field">
        <label>State</label>
        <div class="ui right floated small input">
            <div class="ui selection dropdown">
                <i class="dropdown icon"></i><div class="text">{{story.state.title}}</div>
                <div class="menu transition hidden">
                    <div class="item" *ngFor="let state of states | async" (click)="story.state=state">{{state.title}}</div>
                </div>
            </div>
        </div>
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
        <div class="ui small input">
            <div class="ui fluid dropdown selection multiple">
                <i class="dropdown icon"></i>
                <a class="ui label transition visible" *ngFor="let tag of story.tags">{{tag.title}}<i class="delete icon" (click)="removeSelectedObject($event, story.tags, tag)"></i></a>
                <div class="text"></div>
                <div class="menu">
                    <div class="item" [ngClass]="{filtered: isSelected(story.tags, tag)}" *ngFor="let tag of tags | async" (click)="addSelectedObject($event, story.tags, tag)">{{tag.title}}</div>
                </div>
            </div>
        </div>    
    </div>
    <div class="field">
        <label>Tasks</label>
        <div class="ui small fluid input" *ngFor="let task of story.tasks">
            <div class="ui checkbox">
                <input type="checkbox" [(ngModel)]="task.completed">
                <label></label>
            </div>
            <input [(ngModel)]="task.description">
        </div>
    </div>
    <button class="ui right floated mini button" (click)="addTask()">Add Task</button>
    <div class="ui hidden clearing divider"></div>
    <button class="ui right floated primary button" (click)="saveStory()">Save</button>
    <div class="ui hidden clearing divider"></div>
    
`