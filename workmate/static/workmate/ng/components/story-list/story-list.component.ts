import { Component, Input, OnInit }         from '@angular/core';

import { Story }                            from '../../models/story';
import { StoryService }                     from '../../services/story.service';
import { StoryListItemComponent }           from '../story-list-item/story-list-item.component'
import { htmlTemplate }                     from './story-list.component.html';


@Component({
    selector: '[story-list]',
    template: htmlTemplate,
    directives: [
        StoryListItemComponent
    ]

})

export class StoryListComponent implements OnInit {
    @Input() title: string;

    errorMessage: string;
    stories: Story[];

    constructor(
        private storyService: StoryService
    ) {}

    getStories() {
        this.storyService.getStories()
            .subscribe(
                stories => this.stories = stories,
                error =>  this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.getStories();
    }

    newStory = function () {
        let newStory = new Story();
        newStory.title = 'New story';
        this.stories.push(newStory)
    }
}
