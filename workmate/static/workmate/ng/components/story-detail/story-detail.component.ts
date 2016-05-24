import { Component, ElementRef, Input, OnInit }                 from '@angular/core';

import { Story, StoryState, StoryType, StoryTask }              from '../../models/story';
import { Tag }                                                  from '../../models/tag';
import { StoryService }                                         from '../../services/story.service';
import { StoryStateService }                                    from '../../services/story-state.service';
import { StoryTypeService }                                     from '../../services/story-type.service';
import { TagService }                                           from '../../services/tag.service';
import { htmlTemplate }                                         from './story-detail.component.html';

import { Observable }                                           from 'rxjs/Observable';

declare var jQuery: any;


@Component({
    selector: '[story-detail]',
    template: htmlTemplate
})

export class StoryDetailComponent implements OnInit {
    @Input() story: Story;

    errorMessage: string;
    states: Observable<StoryState[]>;
    tags: Observable<Tag[]>;
    types: Observable<StoryType[]>;

    constructor(
        private elementRef: ElementRef,
        private storyService: StoryService,
        private storyStateService: StoryStateService,
        private storyTypeService: StoryTypeService,
        private tagService: TagService
    ) {}

    addTask() {
        let newTask = new StoryTask();
        this.story.tasks.push(newTask)
    }

    save() {
        if (this.story.id) {
            this.storyService.update(this.story);
        } else {
            this.storyService.create(this.story);
        }
    }

    delete() {
        if (this.story.id) {
            this.storyService.delete(this.story.id);
        }
    }

    ngOnInit() {
        this.tags = this.tagService.objects$;
        this.types = this.storyTypeService.objects$;
        this.states = this.storyStateService.objects$;
        this.storyStateService.loadAll();
        this.storyTypeService.loadAll();
        this.tagService.loadAll();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).find('.ui.checkbox').checkbox({});
            jQuery(this.elementRef.nativeElement).find('.ui.dropdown').dropdown({});
        }, 0);
    }

    addSelectedObject($event:any, model:any, choice:any) {
        $event.stopPropagation();
        let found = false;
        for (var i = 0; i < model.length; i++) {
            if(model[i].id === choice.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            model.push(choice);
        }
    }

    removeSelectedObject($event:any, model:any, choice:any) {
        $event.stopPropagation();
        for (var i = 0; i < model.length; i++) {
            if(model[i].id === choice.id) {
                model.splice(i, 1);
                break;
            }
        }
    }

    isSelected(model:any, item:any) {
        for (var i = 0; i < model.length; i++) {
            if(model[i].id === item.id) {
                return true;
            }
        }
    }

}
