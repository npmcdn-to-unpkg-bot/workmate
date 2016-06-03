export const htmlTemplate = `
    
    <div class="ui selection dropdown multiple {{addedClass}}">
        <i class="dropdown icon"></i>
        <a class="ui label transition visible" *ngFor="let choice of _selectedItems">{{getTextLabel(choice)}}<i class="delete icon" (click)="onRemove($event, choice)"></i></a>
        <div class="text"></div>
        <div class="menu">
            <div class="item" [ngClass]="{filtered: isSelected(choice)}" *ngFor="let choice of choices" (click)="onSelect($event, choice)">{{getTextLabel(choice, choiceLabel)}}</div>
        </div>
    </div>
`;