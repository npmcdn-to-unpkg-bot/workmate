import { Component, OnInit }                from '@angular/core';

import { Story }                            from '../../models/story';
import { StoryService }                     from '../../services/story.service';
import { StoryDetailComponent }             from '../story-detail/story-detail.component'
import { StoryListItemComponent }           from '../story-list-item/story-list-item.component'
import { htmlTemplate }                     from './story-list.component.html';

import { Observable }                       from 'rxjs/Observable';


@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [StoryDetailComponent, StoryListItemComponent]
})

export class StoryListComponent implements OnInit {

    errorMessage: string;
    stories: Observable<Story[]>;
    newBacklogStory: Story;
    newBacklogOpened: boolean = false;
    newIceboxStory: Story;
    newIceboxOpened: boolean = false;

    constructor(
        private storyService: StoryService
    ) {}

    ngOnInit() {
        this.stories = this.storyService.objects$;
        this.storyService.loadAll();
    }

    createNew = function (backlog: boolean) {
        if(backlog) {
            this.newBacklogStory = new Story();
            this.newBacklogOpened = !this.newBacklogOpened;
        } else {
            this.newIceboxStory = new Story();
            this.newIceboxOpened = !this.newIceboxOpened;
        }
    }
}
