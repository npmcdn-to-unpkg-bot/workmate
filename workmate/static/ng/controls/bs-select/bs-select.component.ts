import { Component, Input, OnInit }                 from "@angular/core";
import { ControlValueAccessor, NgModel }            from "@angular/common";

import { SELECT_DIRECTIVES }                        from 'ng2-select/ng2-select';

import { htmlTemplate }                             from './bs-select.component.html';


@Component({
    selector: '[bs-select], bs-select',
    directives: [SELECT_DIRECTIVES],
    template: htmlTemplate
})

export class BSSelect implements ControlValueAccessor, OnInit {

    @Input() choices: any;
    @Input() textLabel: string;
    @Input() boundValueAttr: string;

    private _selectedItem: any;
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
        for (var i = 0; i < this.choices.length; i++) {
            let item = {
                id: this.choices[i].id,
                text: this.choices[i][this.textLabel]
            };
            this._items.push(item);
            if (this._selectedItem && (this.choices[i].id == this._selectedItem.id || this.choices[i].id == this._selectedItem)) {
                this.value = [item];
            }
        }
    }

    writeValue(value: any) {
        this._selectedItem = value;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }
    
    public selected(value:any):void {
        for (var i = 0; i < this.choices.length; i++) {
            if (this.choices[i].id == value.id) {
                let selectedChoice = this.choices[i][this.boundValueAttr] || this.choices[i];
                this.writeValue(selectedChoice);
                this._vm.viewToModelUpdate(selectedChoice);
            }
        }
    }

    public removed(value:any):void {
        let selectedChoice:any = null;
        this.writeValue(selectedChoice);
        this._vm.viewToModelUpdate(selectedChoice);
    }

    public typed(value:any):void { }

    public refreshValue(value:any):void {
        this.value = value;
    }

}