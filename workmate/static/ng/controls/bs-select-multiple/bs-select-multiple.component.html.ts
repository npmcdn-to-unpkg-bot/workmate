export const htmlTemplate = `
    
    <ng-select 
        [allowClear]="false"
        [multiple]="true"
        [items]="_items"
        [initData]="value" 
        (data)="refreshValue($event)"
        (selected)="selected($event)"
        (removed)="removed($event)"
        (typed)="typed($event)"
        placeholder="">
    </ng-select>
    
`;