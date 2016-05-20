import { Component, ElementRef, Input, OnInit }     from '@angular/core';

import { Story }                                    from '../../models/story';
import { htmlTemplate }                             from './story-detail.component.html';

declare var jQuery: any;


@Component({
    selector: '[story-detail]',
    template: htmlTemplate
})

export class StoryDetailComponent implements OnInit {
    @Input() story: Story;

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
    }

    addTask = function () {}
}
