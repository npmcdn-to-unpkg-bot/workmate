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

    private selectedItem: any;

    private onChange: Function;
    private onTouched: Function;
    private vm: NgModel;

    constructor(private elementRef: ElementRef, vm: NgModel) {
        this.vm = vm;
        vm.valueAccessor = this;
    }

    ngOnInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
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
        this.vm.viewToModelUpdate(value);
    }

    writeValue(value: any) {
        this.selectedItem = value;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }



}