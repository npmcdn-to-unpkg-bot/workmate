import { Component }                        from '@angular/core';
import { HTTP_PROVIDERS }                   from '@angular/http';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import './imports/rxjs.ts';

import { StoryService }                     from './services/story.service';
import { TagService }                       from './services/tag.service';
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
    ],
    providers: [
        HTTP_PROVIDERS,
        StoryService,
        TagService
    ],
})

export class AgileComponent {}

bootstrap(AgileComponent);