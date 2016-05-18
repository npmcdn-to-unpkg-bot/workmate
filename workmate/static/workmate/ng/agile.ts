import { Component }                        from '@angular/core';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import { StoryListComponent }               from './components/story-list/story-list.component'


@Component({
    selector: 'agile-app',
    template: `
        <div class="ui equal width grid">
            <div class="column">
                <div class="ui raised segments" story-list [title]="'Backlog'"></div>
            </div>
            <div class="column">
                <div class="ui raised segments" story-list [title]="'Icebox'"></div>
            </div>
        </div>
    `,
    directives: [
        StoryListComponent
    ]
})

export class AgileComponent {}

bootstrap(AgileComponent);