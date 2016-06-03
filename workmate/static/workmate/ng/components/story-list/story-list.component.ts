import { Component, OnInit }                            from '@angular/core';

import { iStory, Story }                                from '../../interfaces/story';
import { iStoryState }                                  from '../../interfaces/story_state';
import { iStoryType }                                   from '../../interfaces/story_type';
import { iTag }                                         from '../../interfaces/tag';
import { StoryService }                                 from '../../services/story.service';
import { StoryStateService }                            from '../../services/story-state.service';
import { StoryTypeService }                             from '../../services/story-type.service';
import { TagService }                                   from '../../services/tag.service';
import { FilterPipe }                                   from '../../pipes/filter-pipe';
import { StoryDetailComponent }                         from '../story-detail/story-detail.component'
import { StoryListItemComponent }                       from '../story-list-item/story-list-item.component'
import { htmlTemplate }                                 from './story-list.component.html';

import { Dragula, DragulaService }                      from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [Dragula, StoryDetailComponent, StoryListItemComponent],
    viewProviders: [DragulaService],
    pipes: [FilterPipe]
})

export class StoryListComponent implements OnInit {

    _stories: iStory[];
    _states: iStoryState[];
    _tags: iTag[];
    _types: iStoryType[];
    _newBacklogStory: Story;
    _newBacklogOpened: boolean = false;
    _newIceboxStory: Story;
    _newIceboxOpened: boolean = false;


    constructor(
        private _StoryService: StoryService,
        private _StoryStateService: StoryStateService,
        private _StoryTypeService: StoryTypeService,
        private _TagService: TagService,
        private _DragulaService: DragulaService
    ) {}

    ngOnInit() {
        this._StoryService.objects$.subscribe(objects => this._stories = objects);
        this._StoryStateService.objects$.subscribe(objects => this._states = objects);
        this._StoryTypeService.objects$.subscribe(objects => this._types = objects);
        this._TagService.objects$.subscribe(objects => this._tags = objects);
        this._StoryService.loadAll();
        this._StoryStateService.loadAll();
        this._StoryTypeService.loadAll();
        this._TagService.loadAll();

        this._DragulaService.drop.subscribe((value:any) => {
            this.onDrop(value.slice(1));
        });
    }

    createNew = function (backlog: boolean) {
        if(backlog) {
            this._newBacklogStory = new Story({
                icebox: false,
                state: null,
                title: 'New Story',
                type: null
            });
            this._newBacklogOpened = !this._newBacklogOpened;
        } else {
            this._newIceboxStory = new Story({
                icebox: true,
                state: null,
                title: 'New Story',
                type: null
            });
            this._newIceboxOpened = !this._newIceboxOpened;
        }
    };

    private onDrop(args:any) {
        let [e, el] = args;
        let data_id = e.attributes['data-id'].value;
        let story = this._stories.find(item => item.id == data_id);
        let icebox = e.parentElement.attributes['data-list'].value == 'icebox';
        story.icebox = icebox;
        this._StoryService.update(story);
    }

    
}
