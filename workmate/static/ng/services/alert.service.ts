import { Injectable }                                       from '@angular/core';

import { iAlert }                                           from '../interfaces/alert';
import { Observable }                                       from 'rxjs/Observable';
import { Observer }                                         from 'rxjs/Observer';


@Injectable()
export class AlertService {

    alerts$: Observable<iAlert[]>;

    private _dataObserver: Observer<iAlert[]>;
    private _dataStore: { alerts: iAlert[] };
    private _nextId: number = 1;
    
    constructor () {
        this.alerts$ = new Observable<iAlert[]>((observer:any) => this._dataObserver = observer).share();
        this._dataStore = { alerts: [] };
    }

    createAlert(alert: iAlert) {
        alert.id = this.getNextId();
        this._dataStore.alerts.push(alert);
        this._dataObserver.next(this._dataStore.alerts);
        if (alert.type == 'error') {
            setTimeout(() => this.closeAlert(alert), alert.dismissErrorTimeout);
        } else {
            setTimeout(() => this.closeAlert(alert), alert.dismissDefaultTimeout);
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
        return this._nextId++;
    }
}
