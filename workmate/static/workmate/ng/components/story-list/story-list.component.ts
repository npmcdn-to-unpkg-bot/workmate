import { Component, Input }                 from '@angular/core';

import { StoryListItemComponent }           from '../story-list-item/story-list-item.component'
import { htmlTemplate }                     from './story-list.component.html';

@Component({
    selector: '[story-list]',
    template: htmlTemplate,
    directives: [
        StoryListItemComponent
    ]

})

export class StoryListComponent {
    @Input() title: string;
}
