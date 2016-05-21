import { Component, ElementRef, Input, OnInit, ViewChild }      from '@angular/core';

import { Story }                                                from '../../models/story';
import { Tag }                                                  from '../../models/tag';
import { StoryService }                                         from '../../services/story.service';
import { TagService }                                           from '../../services/tag.service';
import { htmlTemplate }                                         from './story-detail.component.html';

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
    
    @ViewChild('tagselect') tagSelect:ElementRef;
    
    tags: Tag[];
    elementRef: ElementRef;
    errorMessage: string;
    selectedTags: Tag[];

    constructor(
        elementRef: ElementRef,
        private storyService: StoryService,
        private tagService: TagService
    ) {
        this.elementRef = elementRef;
    }

    getTags() {
        this.tagService.getTags()
            .then(
                tags => this.tags = tags,
                error =>  this.errorMessage = <any>error);
    }

    saveStory() {
        this.storyService.saveStory(this.story)
            .then(
                story => this.story = story,
                error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getTags();
    }

    isTagSelected(tag: Tag) {
        for (var i = 0; i < this.story.tags.length; i++) {
            if (this.story.tags[i].id === tag.id) {
                return 'selected';
            }
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        }, 50);
    }

    changeTags(selectElement: any) {
        this.selectedTags = [];
        for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            var optionModel = this.tags[i];
            if (optionElement.selected == true) {
                this.selectedTags.push(optionModel)
            }
        }
        this.story.tags = this.selectedTags;
    }

}
