export const htmlTemplate = `
    
    <div class="ui label">ID<div class="detail">{{ story.id }}</div></div>
    <div class="ui form">
        <div class="field">
            <textarea [(ngModel)]="story.title" rows="2" placeholder="title"></textarea>
        </div>
        <div class="field">
            <select [(ngModel)]="story.effort" class="ui dropdown">
                <option value="0.5">0.5 Points</option>
                <option value="1">1 Point</option>
                <option value="2">2 Points</option>
                <option value="3">3 Points</option>
                <option value="5">5 Points</option>
            </select>
        </div>
    </div>
    
`