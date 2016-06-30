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
import { OrderBy }                                      from '../../pipes/orderby-pipe';
import { StoryDetailComponent }                         from '../story-detail/story-detail.component'
import { StoryListItemComponent }                       from '../story-list-item/story-list-item.component'
import { htmlTemplate }                                 from './story-list.component.html';

import { DND_PROVIDERS, DND_DIRECTIVES }                from 'ng2-dnd/ng2-dnd';

@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [DND_DIRECTIVES, StoryDetailComponent, StoryListItemComponent],
    viewProviders: [DND_PROVIDERS],
    pipes: [FilterPipe, OrderBy]
})

export class StoryListComponent implements OnInit {

    _stories: iStory[] = [];
    _storiesByState: Array<iStory[]> = [];
    _states: iStoryState[];
    _tags: iTag[];
    _types: iStoryType[];
    _newStory: Story;

    constructor(
        private _StoryService: StoryService,
        private _StoryStateService: StoryStateService,
        private _StoryTypeService: StoryTypeService,
        private _TagService: TagService
    ) {}

    ngOnInit() {
        this._StoryService.objects$.subscribe(objects => {
            this._stories = objects;
            this._StoryStateService.objects$.subscribe(objects => {
                this._states = objects;
                this._states.forEach((item, i) => {
                    this._storiesByState[item.id] = new OrderBy().transform(this._stories.filter(story => story.state.id == item.id), ['order']);
                });
            });
            this._StoryStateService.loadAll();
        });
        this._StoryTypeService.objects$.subscribe(objects => this._types = objects);
        this._TagService.objects$.subscribe(objects => this._tags = objects);
        this._StoryService.loadAll();
        this._StoryTypeService.loadAll();
        this._TagService.loadAll();
    }

    private createNew = function (state: iStoryState) {
        if (this._newStory) {
            this._newStory = null;
        } else {
            let stories = this._storiesByState[state.id];
            this._newStory = new Story({
                icebox: false,
                state: state,
                title: 'New Story',
                type: null
            });
            this.setStoryOrder(this._newStory, -1, stories);
        }
    };

    private moveStory(story:iStory, index:number, state: iStoryState) {
        let stories = this._storiesByState[state.id];
        this.setStoryOrder(story, index, stories);
        story.state = state;
        this._StoryService.update(story);
    }

    private setStoryOrder(story:iStory, index:number, stories:iStory[]) {
        let itemCount = stories.length;
        let min = 0;
        let max = 100;
        if (index == -1) {
            if (itemCount >= 1) {
                max = parseFloat(stories[0].order.toString());
                min = max - 1;
            }
        } else {
            if (itemCount == 1) {
                // do nothing
            } else if (index == 0) {
                max = parseFloat(stories[index+1].order.toString());
                min = max - 1;
            } else if (index == itemCount-1) {
                min = parseFloat(stories[index-1].order.toString());
                max = min + 1
            } else {
                min = parseFloat(stories[index-1].order.toString());
                max = parseFloat(stories[index+1].order.toString());
            }
        }
        story.order = this.getRandomNumber(min, max);
    }

    private getRandomNumber(min:number, max:number) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(8));
    }
    
}
