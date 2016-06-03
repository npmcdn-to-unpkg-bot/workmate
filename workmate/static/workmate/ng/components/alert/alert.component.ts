import { Component, OnInit }                            from '@angular/core';

import { iAlert }                                       from '../../interfaces/alert';
import { AlertService }                                 from '../../services/alert.service';


const ALERT_TEMPLATE = `
    <div class="ui {{ alert.type }} message" *ngFor="let alert of _alerts">
        <i class="close icon" *ngIf="alert.dismissable"></i><div class="header capitalize">{{ alert.type }}</div>
        <p>{{ alert.message }}</p>
    </div>
  `;

@Component({
    selector: 'alert',
    template: ALERT_TEMPLATE
})

export class AlertComponent implements OnInit {

    _alerts: iAlert[];

    constructor(
        private _AlertService: AlertService
    ) {}

    ngOnInit() {
        this._AlertService.alerts$.subscribe(alerts => this._alerts = alerts);
    }

}
