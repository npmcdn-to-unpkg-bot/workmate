import { Component, ElementRef, Input, OnInit, Provider, forwardRef }   from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES }     from "@angular/common";

import { htmlTemplate }                                                 from './sm-select.component.html';


const noop = () => {};

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => SMSelect),
        multi: true
    }
);

declare var jQuery: any;

@Component({
    selector: '[sm-select], sm-select',
    template: htmlTemplate,
    directives: [
        CORE_DIRECTIVES
    ],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})

export class SMSelect implements ControlValueAccessor, OnInit {

    @Input() choices: any;
    @Input() choiceLabel: string;
    @Input() choiceValue: string;

    private _value: any = '';

    private _onTouchedCallback: (_:any) => void = noop;

    private _onChangeCallback: (_:any) => void = noop;

    get value(): any { return this._value; };

    set value(value: any) {
        if (value !== this._value) {
            let v = this.choiceValue ? value[this.choiceValue] : value;
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        }, 0);
    }

    getChoiceLabel(choice: any) {
        let label = choice;
        if (choice && this.choiceLabel && this.choiceValue) {
            this.choices.forEach((item: any) => {
                if (choice && choice[this.choiceValue] == item[this.choiceValue] || choice == item[this.choiceValue]) {
                    label = item[this.choiceLabel];
                }
            });
        } else if (choice && this.choiceLabel) {
            label = choice[this.choiceLabel];
        }
        return label;
    }

    writeValue(value: any) {
      this._value = value;
    }

    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }

}