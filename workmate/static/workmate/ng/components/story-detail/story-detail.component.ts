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

    _states: iStoryState[];
    _tags: iTag[];
    _types: iStoryType[];

    constructor(
        private _StoryService: StoryService,
        private _StoryStateService: StoryStateService,
        private _StoryTypeService: StoryTypeService,
        private _TagService: TagService
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
            this._StoryService.update(this.story);
        } else {
            this._StoryService.create(this.story);
        }
    }

    delete() {
        if (this.story.id) {
            this._StoryService.delete(this.story.id);
        }
    }

    ngOnInit() {
        this._StoryTypeService.objects$.subscribe(objects => this._types = objects);
        this._StoryStateService.objects$.subscribe(objects => this._states = objects);
        this._TagService.objects$.subscribe(objects => this._tags = objects);
        this._StoryStateService.loadAll();
        this._StoryTypeService.loadAll();
        this._TagService.loadAll();
    }

}
