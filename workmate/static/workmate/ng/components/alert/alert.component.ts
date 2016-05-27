import { Component, OnInit }                            from '@angular/core';

import { Alert, AlertService }                          from '../../services/alert.service';


const ALERT_TEMPLATE = `
    <div class="ui {{ alert.type }} message" *ngFor="let alert of alerts">
        <i class="close icon" *ngIf="alert.dismissable"></i><div class="header capitalize">{{ alert.type }}</div>
        <p>{{ alert.message }}</p>
    </div>
  `;

@Component({
    selector: 'alert',
    template: ALERT_TEMPLATE
})

export class AlertComponent implements OnInit {

    alerts: Alert[];

    constructor(
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.alertService.alerts$.subscribe(alerts => this.alerts = alerts);
    }

}
