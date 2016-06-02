import { Component, OnInit }                            from '@angular/core';

import { iStory, Story }                                from '../../interfaces/story';
import { iStoryState }                                  from '../../interfaces/story_state';
import { iStoryType }                                   from '../../interfaces/story_type';
import { iTag }                                         from '../../interfaces/tag';
import { StoryService }                                 from '../../services/story.service';
import { StoryStateService }                            from '../../services/story-state.service';
import { StoryTypeService }                             from '../../services/story-type.service';
import { TagService }                                   from '../../services/tag.service';
import { FilterPipe }                                   from '../../pipes/filter-pipe';
import { StoryDetailComponent }                         from '../story-detail/story-detail.component'
import { StoryListItemComponent }                       from '../story-list-item/story-list-item.component'
import { htmlTemplate }                                 from './story-list.component.html';

import { Dragula, DragulaService }                      from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'story-list',
    template: htmlTemplate,
    directives: [Dragula, StoryDetailComponent, StoryListItemComponent],
    viewProviders: [DragulaService],
    pipes: [FilterPipe]
})

export class StoryListComponent implements OnInit {

    stories: iStory[];
    states: iStoryState[];
    tags: iTag[];
    types: iStoryType[];
    newBacklogStory: Story;
    newBacklogOpened: boolean = false;
    newIceboxStory: Story;
    newIceboxOpened: boolean = false;


    constructor(
        private storyService: StoryService,
        private storyStateService: StoryStateService,
        private storyTypeService: StoryTypeService,
        private tagService: TagService,
        private dragulaService: DragulaService
    ) {}

    ngOnInit() {
        this.storyService.objects$.subscribe(objects => this.stories = objects);
        this.storyStateService.objects$.subscribe(objects => this.states = objects);
        this.storyTypeService.objects$.subscribe(objects => this.types = objects);
        this.tagService.objects$.subscribe(objects => this.tags = objects);
        this.storyService.loadAll();
        this.storyStateService.loadAll();
        this.storyTypeService.loadAll();
        this.tagService.loadAll();

        this.dragulaService.drop.subscribe((value:any) => {
            console.log(value);
            this.onDrop(value.slice(1));
        });
    }

    createNew = function (backlog: boolean) {
        if(backlog) {
            this.newBacklogStory = new Story({
                icebox: false,
                state: null,
                title: 'New Story',
                type: null
            });
            this.newBacklogOpened = !this.newBacklogOpened;
        } else {
            this.newIceboxStory = new Story({
                icebox: true,
                state: null,
                title: 'New Story',
                type: null
            });
            this.newIceboxOpened = !this.newIceboxOpened;
        }
    };

    private onDrop(args:any) {
        let [e, el] = args;
        let data_id = e.attributes['data-id'].value;
        let story = this.stories.find(item => item.id == data_id);
        let icebox = e.parentElement.attributes['data-list'].value == 'icebox';
        story.icebox = icebox;
        this.storyService.update(story);
    }

    
}
