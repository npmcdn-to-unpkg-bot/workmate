import { Component, Input }                 from '@angular/core';

import { Story }                            from '../../models/story';
import { htmlTemplate }                     from './story-detail.component.html';


@Component({
    selector: '[story-detail]',
    template: htmlTemplate
})

export class StoryDetailComponent {
    @Input() story: Story;
}
