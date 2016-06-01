import { Component, Input, OnInit }                                         from '@angular/core';

import { iStory }                                                           from '../../interfaces/story';
import { iStoryState }                                                      from '../../interfaces/story_state';
import { iStoryType }                                                       from '../../interfaces/story_type';
import { iTag }                                                             from '../../interfaces/tag';
import { StoryTask }                                                        from '../../interfaces/story_task';
import { SMSelect }                                                         from '../../controls/sm-select/sm-select.component';
import { SMSelectMultiple }                                                 from '../../controls/sm-select-multiple/sm-select-multiple.component';
import { StoryService }                                                     from '../../services/story.service';
import { StoryStateService }                                                from '../../services/story-state.service';
import { StoryTypeService }                                                 from '../../services/story-type.service';
import { TagService }                                                       from '../../services/tag.service';
import { htmlTemplate }                                                     from './story-detail.component.html';


@Component({
    selector: '[story-detail]',
    template: htmlTemplate,
	directives: [
        SMSelect,
        SMSelectMultiple
    ]
})

export class StoryDetailComponent implements OnInit {
    @Input() story: iStory;

    states: iStoryState[];
    tags: iTag[];
    types: iStoryType[];

    constructor(
        private storyService: StoryService,
        private storyStateService: StoryStateService,
        private storyTypeService: StoryTypeService,
        private tagService: TagService
    ) {}

    addTask() {
        let newTask = new StoryTask({
            completed: false,
            description: ''
        });
        this.story.tasks.push(newTask)
    }

    save() {
        if (this.story.id) {
            this.storyService.update(this.story);
        } else {
            this.storyService.create(this.story);
        }
    }

    delete() {
        if (this.story.id) {
            this.storyService.delete(this.story.id);
        }
    }

    ngOnInit() {
        this.storyTypeService.objects$.subscribe(objects => this.types = objects);
        this.storyStateService.objects$.subscribe(objects => this.states = objects);
        this.tagService.objects$.subscribe(objects => this.tags = objects);
        this.storyStateService.loadAll();
        this.storyTypeService.loadAll();
        this.tagService.loadAll();
    }

}
