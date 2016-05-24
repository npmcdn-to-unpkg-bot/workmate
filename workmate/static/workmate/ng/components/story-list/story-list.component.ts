import { Component, OnInit }                from '@angular/core';

import { Story }                            from '../../models/story';
import { StoryService }                     from '../../services/story.service';
import { StoryListItemComponent }           from '../story-list-item/story-list-item.component'
import { htmlTemplate }                     from './story-list.component.html';

import { Observable }                       from 'rxjs/Observable';


@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [StoryListItemComponent]
})

export class StoryListComponent implements OnInit {

    errorMessage: string;
    stories: Observable<Story[]>;
    toggleNew: boolean = false;
    newStory: Story;
    opened: boolean = false;

    constructor(
        private storyService: StoryService
    ) {}

    ngOnInit() {
        this.stories = this.storyService.objects$;
        this.storyService.loadAll();
    }

    createNew = function () {
        this.newStory = new Story();
        this.opened = true;
    }
}
