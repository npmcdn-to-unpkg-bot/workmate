import { Component, OnInit }                            from '@angular/core';
import { CORE_DIRECTIVES }                              from '@angular/common';

import { AlertComponent }                               from 'ng2-bootstrap/ng2-bootstrap';

import { iAlert }                                       from '../../interfaces/alert';
import { AlertService }                                 from '../../services/alert.service';


const ALERT_TEMPLATE = `
    <alert *ngFor="let alert of _alerts; let i = index" [type]="alert.type" dismissible="alert.dismissable" (close)="closeAlert(i)">
        {{ alert.message }}
    </alert>
  `;

@Component({
    selector: 'alert-block',
    directives: [AlertComponent, CORE_DIRECTIVES],
    template: ALERT_TEMPLATE
})

export class AlertBlockComponent implements OnInit {

    _alerts: iAlert[];

    constructor(
        private _AlertService: AlertService
    ) {}

    ngOnInit() {
        this._AlertService.alerts$.subscribe(alerts => this._alerts = alerts);
    }

    public closeAlert(i:number):void {
        this._alerts.splice(i, 1);
    }

}
