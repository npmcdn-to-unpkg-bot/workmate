export const htmlTemplate = `
    
    <div class="ui selection dropdown multiple {{addedClass}}">
        <i class="dropdown icon"></i>
        <a class="ui label transition visible" *ngFor="let choice of value">{{getChoiceLabel(choice, choiceLabel)}}<i class="delete icon" (click)="removeSelectedObject($event, value, choice)"></i></a>
        <div class="text"></div>
        <div class="menu">
            <div class="item" [ngClass]="{filtered: isSelected(value, choice)}" *ngFor="let choice of choices" (click)="addSelectedObject($event, value, choice)">{{getChoiceLabel(choice, choiceLabel)}}</div>
        </div>
    </div>
`;