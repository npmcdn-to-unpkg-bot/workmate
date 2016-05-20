import { Component, ElementRef, Input, OnInit }     from '@angular/core';

import { Story }                                    from '../../models/story';
import { Tag }                                      from '../../models/tag';
import { TagService }                               from '../../services/tag.service';
import { htmlTemplate }                             from './story-detail.component.html';

declare var jQuery: any;


@Component({
    selector: '[story-detail]',
    template: htmlTemplate,
    providers: [
        TagService
    ]
})

export class StoryDetailComponent implements OnInit {
    @Input() story: Story;

    tags: Tag [];
    elementRef: ElementRef;
    errorMessage: string;

    constructor(elementRef: ElementRef, private tagService: TagService) {
        this.elementRef = elementRef;
    }

    getTags() {
        this.tagService.getTags()
            .then(
                tags => this.tags = tags,
                error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getTags();
        jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
    }

    addTask = function () {}

}
