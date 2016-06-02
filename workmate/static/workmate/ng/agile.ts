import { Component, provide }               from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions }   from '@angular/http';
import { bootstrap }                        from '@angular/platform-browser-dynamic';

import './imports/rxjs.ts';

import { ExRequestOptions }                 from './transportBoxes/exRequestOptions';
import { AlertService }                     from './services/alert.service';
import { StoryService }                     from './services/story.service';
import { StoryStateService }                from './services/story-state.service';
import { StoryTypeService }                 from './services/story-type.service';
import { TagService }                       from './services/tag.service';
import { AlertComponent }                   from './components/alert/alert.component';
import { StoryListComponent }               from './components/story-list/story-list.component';


@Component({
    selector: 'agile-app',
    template: `
        <story-list></story-list>
        <div class="wm-messages ui sticky bottom fixed"><alert></alert></div>
    `,
    directives: [
        StoryListComponent,
        AlertComponent
    ],
    providers: [
        HTTP_PROVIDERS,
        provide(RequestOptions, {useClass: ExRequestOptions}),
        AlertService,
        StoryService,
        StoryStateService,
        StoryTypeService,
        TagService
    ]
})

export class AgileComponent {
    
}

bootstrap(AgileComponent);