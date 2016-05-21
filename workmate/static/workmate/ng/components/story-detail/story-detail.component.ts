import { Component, ElementRef, Input, OnInit, ViewChild }      from '@angular/core';

import { Story, StoryState, StoryType, StoryTask }              from '../../models/story';
import { Tag }                                                  from '../../models/tag';
import { StoryService }                                         from '../../services/story.service';
import { TagService }                                           from '../../services/tag.service';
import { htmlTemplate }                                         from './story-detail.component.html';

declare var jQuery: any;


@Component({
    selector: '[story-detail]',
    template: htmlTemplate
})

export class StoryDetailComponent implements OnInit {
    @Input() story: Story;
    
    @ViewChild('tagselect') tagSelect:ElementRef;

    savedStory: Story;
    states: StoryState[];
    tags: Tag[];
    types: StoryType[];
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

    addTask() {
        let newTask = new StoryTask();
        this.story.tasks.push(newTask)
    }

    getStates() {
        this.storyService.getStates()
            .subscribe(
                states => this.states = states,
                error =>  this.errorMessage = <any>error);
    }

    getTags() {
        this.tagService.getTags()
            .subscribe(
                tags => this.tags = tags,
                error =>  this.errorMessage = <any>error);
    }

    getTypes() {
        this.storyService.getTypes()
            .subscribe(
                types => this.types = types,
                error =>  this.errorMessage = <any>error);
    }

    saveStory() {
        this.storyService.saveStory(this.story)
            .subscribe(
                story => this.story = story,
                error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getStates();
        this.getTags();
        this.getTypes();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        }, 100);
    }

    isTagSelected(tag: Tag) {
        if (!this.story.tags) {
            return;
        }
        for (var i = 0; i < this.story.tags.length; i++) {
            if (this.story.tags[i].id === tag.id) {
                return 'selected';
            }
        }
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
