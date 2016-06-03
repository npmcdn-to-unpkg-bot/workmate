export const htmlTemplate = `
    
    <div class="ui selection dropdown">
        <i class="dropdown icon"></i><div class="text">{{getTextLabel(_selectedItem)}}</div>
        <div class="menu transition hidden">
            <div class="item" *ngFor="let choice of choices" (click)="onSelect(choice)">{{getTextLabel(choice)}}</div>
        </div>
    </div>
`;