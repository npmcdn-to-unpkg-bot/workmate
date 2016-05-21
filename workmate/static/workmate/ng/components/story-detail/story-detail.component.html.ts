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
        <label>Story Type</label>
        <div class="ui right floated small input">
            <select class="ui dropdown">
                <option value="1">Feature</option>
                <option value="2">Bug</option>
                <option value="3">Chore</option>
                <option value="4">Release</option>
            </select>
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
            <select class="ui dropdown">
                <option value="1">Not Started</option>
            </select>
        </div>
    </div>
    <div class="ui hidden clearing divider"></div>
    <div class="inline field">
        <label>Owner</label>
        <div class="ui right floated small input">
            <select class="ui dropdown">
                <option value="1">Bill</option>
            </select>
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
            <select #tagselect class="ui fluid dropdown" multiple (change)="changeTags($event.target)" style="display:none;">
                <option *ngFor="let tag of tags" [value]="tag.id" [attr.selected]="isTagSelected(tag)">{{ tag.title }}</option>
            </select>
        </div>    
    </div>
    <div class="field">
        <label>Tasks</label>
        <div class="ui small fluid input">
            <div class="ui checkbox">
                <input type="checkbox">
                <label></label>
            </div>
            <input>
        </div>
    </div>
    <button class="ui right floated mini button">Add Task</button>
    <div class="ui hidden clearing divider"></div>
    <button class="ui right floated primary button" (click)="saveStory()">Save</button>
    <div class="ui hidden clearing divider"></div>
    
`