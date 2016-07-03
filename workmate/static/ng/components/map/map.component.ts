import { Component, Input }                     from '@angular/core';

import { GOOGLE_MAPS_DIRECTIVES }               from 'angular2-google-maps/core';
import { htmlTemplate }                         from './map.component.html';

@Component({
    selector: 'google-map',
    directives: [GOOGLE_MAPS_DIRECTIVES],
    styles: [`
        .sebm-google-map-container {
            height: 400px;
        }
    `],
    template: htmlTemplate
})

export class GoogleMap {

    @Input() zoom: number;
    @Input() lat: number;
    @Input() lng: number;

}