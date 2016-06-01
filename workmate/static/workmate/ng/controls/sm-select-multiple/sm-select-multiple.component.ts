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

    private selectedItems: any = [];
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
        return choice[this.textLabel] || choice;
    }

    onSelect($event:any, choice:any) {
        $event.stopPropagation();
        let found = false;
        for (var i = 0; i < this.selectedItems.length; i++) {
            if(this.selectedItems[i].id === choice.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            this.selectedItems.push(choice);
            this.vm.viewToModelUpdate(this.selectedItems);
        }
    }

    onRemove($event:any, choice:any) {
        $event.stopPropagation();
        for (var i = 0; i < this.selectedItems.length; i++) {
            if(this.selectedItems[i].id === choice.id) {
                this.selectedItems.splice(i, 1);
                this.vm.viewToModelUpdate(this.selectedItems);
                break;
            }
        }
    }

    isSelected(item:any) {
        for (var i = 0; i < this.selectedItems.length; i++) {
            if(this.selectedItems[i].id === item.id) {
                return true;
            }
        }
    }

    writeValue(value: any) {
      this.selectedItems = value;
    }

    public registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

}