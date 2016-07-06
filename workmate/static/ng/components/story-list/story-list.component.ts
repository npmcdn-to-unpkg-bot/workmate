import { Component, OnInit }                            from '@angular/core';

import { iStory, Story }                                from '../../interfaces/story';
import { iStoryState }                                  from '../../interfaces/story_state';
import { StoryService }                                 from '../../services/story.service';
import { StoryStateService }                            from '../../services/story-state.service';
import { FilterPipe }                                   from '../../pipes/filter-pipe';
import { OrderBy }                                      from '../../pipes/orderby-pipe';
import { StoryDetailComponent }                         from '../story-detail/story-detail.component'
import { StoryListItemComponent }                       from '../story-list-item/story-list-item.component'
import { htmlTemplate }                                 from './story-list.component.html';

import { DND_PROVIDERS, DND_DIRECTIVES }                from 'ng2-dnd/ng2-dnd';
import { Observable }                                   from 'rxjs/Observable';


@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [DND_DIRECTIVES, StoryDetailComponent, StoryListItemComponent],
    viewProviders: [DND_PROVIDERS],
    pipes: [FilterPipe, OrderBy]
})

export class StoryListComponent implements OnInit {

    _storiesByState: Array<iStory[]> = [];
    _states: Observable<iStoryState[]>;
    _newStory: Story;

    constructor(
        private _StoryService: StoryService,
        private _StoryStateService: StoryStateService
    ) {}

    ngOnInit() {
        this._states = this._StoryStateService.objects$;
        this._states.subscribe(objects => {
            objects.forEach((item, i) => {
                this._StoryService.objects$.subscribe(objects => {
                    this._storiesByState[item.id] = new OrderBy().transform(objects.filter(object => object.state.id === item.id), ['order']);
                });
            });
        });
        this._StoryStateService.loadAll();
        this._StoryService.loadAll();
    }

    private createNew = function (state: iStoryState) {
        if (this._newStory) {
            this._newStory = null;
        } else {
            let stories = this._storiesByState[state.id];
            this._newStory = new Story({
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