import { Component }                        from '@angular/core';

import { htmlTemplate }                     from './story-list-item.component.html';


export class Story {
    id: number;
    title: string;
    effort: number;
}


@Component({
    selector: '[story-list-item]',
    template: htmlTemplate

})

export class StoryListItemComponent {
    story: Story = {
        id: 1,
        title: 'Some story title',
        effort: 1
    };
}
