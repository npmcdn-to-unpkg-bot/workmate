import { Injectable }                                       from '@angular/core';

import { iAlert }                                           from '../interfaces/alert';
import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class AlertService {

    alerts$: Observable<iAlert[]>;

    private _dataObserver: Observer<iAlert[]>;
    private _dataStore: { alerts: iAlert[] };
    private nextId: number = 1;

    constructor () {
        this._dataStore = { alerts: [] };
        this.alerts$ = new Observable<iAlert[]>((observer:any) => this._dataObserver = observer).share();
    }

    createAlert(alert: iAlert) {
        alert.id = this.getNextId();
        this._dataStore.alerts.push(alert);
        this._dataObserver.next(this._dataStore.alerts);
        if (alert.dismissOnTimeout > 0) {
            setTimeout(() => this.closeAlert(alert), alert.dismissOnTimeout);
        }
    }

    closeAlert(alert: iAlert) {
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
