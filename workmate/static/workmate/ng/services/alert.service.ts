import { Injectable }                                       from '@angular/core';

import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


export class Alert {
    id: number;
    type: string = 'info';
    message: string;
    dismissable: boolean = true;
    dismissOnTimeout: number = 5000;
}

@Injectable()
export class AlertService {

    alerts$: Observable<Alert[]>;

    private _dataObserver: Observer<Alert[]>;
    private _dataStore: { alerts: Alert[] };
    private nextId: number = 1;

    constructor () {
        this._dataStore = { alerts: [] };
        this.alerts$ = new Observable<Alert[]>((observer:any) => this._dataObserver = observer).share();
    }

    createAlert(alert: Alert) {
        alert.id = this.getNextId();
        this._dataStore.alerts.push(alert);
        this._dataObserver.next(this._dataStore.alerts);
        if (alert.dismissOnTimeout > 0) {
            setTimeout(() => this.closeAlert(alert), alert.dismissOnTimeout);
        }
    }

    closeAlert(alert: Alert) {
        this._dataStore.alerts.forEach((item, i) => {
            if (item.id === alert.id) {
                this._dataStore.alerts.splice(i, 1);
            }
        });
        this._dataObserver.next(this._dataStore.alerts);
    }

    private getNextId() {
        return this.nextId++;
    }
}
