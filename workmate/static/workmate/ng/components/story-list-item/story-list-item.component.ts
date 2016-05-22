import { Component, Input }                 from '@angular/core';

import { Story }                            from '../../models/story';
import { StoryDetailComponent }             from '../story-detail/story-detail.component';
import { htmlTemplate }                     from './story-list-item.component.html';


@Component({
    selector: '[story-list-item]',
    template: htmlTemplate,
    directives: [StoryDetailComponent]
})

export class StoryListItemComponent {
    @Input() story: Story;

    open: boolean = false;

    toggle = function() {
        this.open = !this.open;
    }
}
