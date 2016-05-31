export const htmlTemplate = `
    
    <div class="ui selection dropdown">
        <i class="dropdown icon"></i><div class="text">{{getChoiceLabel(value, choiceLabel)}}</div>
        <div class="menu transition hidden">
            <div class="item" *ngFor="let choice of choices" (click)="value=choice">{{getChoiceLabel(choice, choiceLabel)}}</div>
        </div>
    </div>
`;