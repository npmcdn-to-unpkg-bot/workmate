import { Component, Input }                 from '@angular/core';

import { iStory }                           from '../../interfaces/story';
import { StoryDetailComponent }             from '../story-detail/story-detail.component';
import { htmlTemplate }                     from './story-list-item.component.html';


@Component({
    selector: '[story-list-item]',
    template: htmlTemplate,
    directives: [StoryDetailComponent]
})

export class StoryListItemComponent {
    @Input() story: iStory;

    _opened: boolean = false;

    toggle = function() {
        this._opened = !this._opened;
    }
}
