import { Component, Input, OnInit }                 from "@angular/core";
import { ControlValueAccessor, NgModel }            from "@angular/common";

import { SELECT_DIRECTIVES }                        from 'ng2-select/ng2-select';

import { htmlTemplate }                             from './bs-select-multiple.component.html';


@Component({
    selector: '[bs-select-multiple], bs-select-multiple',
    directives: [SELECT_DIRECTIVES],
    template: htmlTemplate
})

export class BSSelectMultiple implements ControlValueAccessor, OnInit {

    @Input() choices: any;
    @Input() textLabel: string;
    @Input() addedClass: string;

    private _selectedItems: any = [];
    private _items: Array<any> = [];
    private value:any = [];
    
    private _onChange: Function;
    private _onTouched: Function;
    private _vm: NgModel;

    constructor(_vm: NgModel) {
        this._vm = _vm;
        _vm.valueAccessor = this;
    }

    ngOnInit() {
        if (this.choices) {
            for (var i = 0; i < this.choices.length; i++) {
                let item = {
                    id: this.choices[i].id,
                    text: this.choices[i][this.textLabel]
                };
                this._items.push(item);
                let itemInModel = this.findById(this._selectedItems, item.id);
                if (itemInModel) {
                    this.value.push(item);
                }
            }
        }
    }

    writeValue(value: any) {
        this._selectedItems = value;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    public selected(value:any):void {
        let originalItem = this.findById(this.choices, value.id);
        if (originalItem) {
            this._selectedItems.push(originalItem);
            this._vm.viewToModelUpdate(this._selectedItems);
        }
    }

    public removed(value:any):void {
        let removedItemInModel = this.findById(this._selectedItems, value.id);
        if (removedItemInModel) {
            let index = this._selectedItems.indexOf(removedItemInModel);
            this._selectedItems.splice(index, 1);
            this._vm.viewToModelUpdate(this._selectedItems);
        }
    }

    public typed(value:any):void { }

    public refreshValue(value:any):void {
        this.value = value;
    }

    private findById(input:any, id:any) {
        for (var i = 0; i < input.length; i++) {
            if (input[i].id == id) {
                return input[i];
            }
        }
        return null;
    }

}