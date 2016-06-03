import { Component, ElementRef, Input, OnInit }     from "@angular/core";
import { ControlValueAccessor, NgModel }            from "@angular/common";

import { htmlTemplate }                             from './sm-select.component.html';

declare var jQuery: any;


@Component({
    selector: '[sm-select], sm-select',
    template: htmlTemplate
})

export class SMSelect implements ControlValueAccessor, OnInit {

    @Input() choices: any;
    @Input() textLabel: string;
    @Input() boundValueAttr: string;

    private _selectedItem: any;

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
        if (!choice) {
            return;
        }
        if (this.textLabel && this.boundValueAttr) {
            for (var i = 0; i < this.choices.length; i++) {
                if (choice[this.boundValueAttr] == this.choices[i][this.boundValueAttr] || choice == this.choices[i][this.boundValueAttr]) {
                    return this.choices[i][this.textLabel];
                }
            }
        }
        return choice[this.textLabel] || choice;
    }

    onSelect(item: any) {
        let value = item[this.boundValueAttr] || item;
        this.writeValue(value);
        this._vm.viewToModelUpdate(value);
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



}