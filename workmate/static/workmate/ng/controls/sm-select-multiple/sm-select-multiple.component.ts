import { Component, ElementRef, Input, OnInit }     from "@angular/core";
import { ControlValueAccessor, NgModel }            from "@angular/common";

import { htmlTemplate }                             from './sm-select-multiple.component.html';

declare var jQuery: any;


@Component({
    selector: '[sm-select-multiple], sm-select-multiple',
    template: htmlTemplate
})

export class SMSelectMultiple implements ControlValueAccessor, OnInit {

    @Input() choices: any;
    @Input() textLabel: string;
    @Input() addedClass: string;

    private _selectedItems: any = [];
    private _onChange: Function;
    private _onTouched: Function;
    private _vm: NgModel;

    constructor(private _elementRef: ElementRef, _vm: NgModel) {
        this._vm = _vm;
        _vm.valueAccessor = this;
    }

    ngOnInit() {
        setTimeout(() => {
            jQuery(this._elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        }, 0);
    }

    getTextLabel(choice: any) {
        return choice[this.textLabel] || choice;
    }

    onSelect($event:any, choice:any) {
        $event.stopPropagation();
        let found = false;
        for (var i = 0; i < this._selectedItems.length; i++) {
            if(this._selectedItems[i].id === choice.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            this._selectedItems.push(choice);
            this._vm.viewToModelUpdate(this._selectedItems);
        }
    }

    onRemove($event:any, choice:any) {
        $event.stopPropagation();
        for (var i = 0; i < this._selectedItems.length; i++) {
            if(this._selectedItems[i].id === choice.id) {
                this._selectedItems.splice(i, 1);
                this._vm.viewToModelUpdate(this._selectedItems);
                break;
            }
        }
    }

    isSelected(item:any) {
        for (var i = 0; i < this._selectedItems.length; i++) {
            if(this._selectedItems[i].id === item.id) {
                return true;
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

}