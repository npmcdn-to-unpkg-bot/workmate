import { Component, ElementRef, Input, OnInit, ViewChild }      from '@angular/core';

import { Story, StoryState, StoryType, StoryTask }              from '../../models/story';
import { Tag }                                                  from '../../models/tag';
import { StoryService }                                         from '../../services/story.service';
import { TagService }                                           from '../../services/tag.service';
import { htmlTemplate }                                         from './story-detail.component.html';

import { Observable }                                           from 'rxjs/Observable';

declare var jQuery: any;


@Component({
    selector: '[story-detail]',
    template: htmlTemplate
})

export class StoryDetailComponent implements OnInit {
    @Input() story: Story;
    
    @ViewChild('tagselect') tagSelect:ElementRef;

    elementRef: ElementRef;
    errorMessage: string;
    selectedState: StoryState[];
    states: Observable<StoryState[]>;
    tags: Tag[];
    types: StoryType[];

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

    saveStory() {
        if (this.story.id) {
            this.storyService.update(this.story);
        } else {
            this.storyService.create(this.story);
        }
    }

    ngOnInit() {
        this.tagService.tags$.subscribe(tags => { this.tags = tags; });
        this.storyService.types$.subscribe(types => { this.types = types; });
        this.states = this.storyService.states$;
        this.storyService.loadAllStates();
        this.storyService.loadAllTypes();
        this.tagService.loadAll();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown.multi').dropdown({});
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
        let selectedTags: Tag[] = [];
        for (var i = 0; i < selectElement.options.length; i++) {
            var optionElement = selectElement.options[i];
            var optionModel = this.tags[i];
            if (optionElement.selected == true) {
                selectedTags.push(optionModel)
            }
        }
        this.story.tags = selectedTags;
    }

}
