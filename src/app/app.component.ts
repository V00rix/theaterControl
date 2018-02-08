import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PerformanceService} from './services/performace.service';
import {Performance} from './models/performance';
import {Availability} from './models/seat';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public performances$: Observable<any>;

    constructor(public psv: PerformanceService) {
    }

    ngOnInit() {
        this.performances$ = this.psv.performancesChanged.map(() => {
            return this.psv.performances;
        });
    }

    performanceAdd(performances: Performance[]) {
        this.psv.addPerformance(new Performance(null, null, null, []));
    }

    performanceDelete(id: number) {
        // confirm?
        console.log(id);

        this.psv.deletePerformance(id);
    }

    sessionDelete(sid: number, pid: number) {
        this.psv.deleteSession(pid, sid);
    }

    commitChanges() {
        this.psv.httpStorePerformances();
    }

    cancelChanges() {
        this.psv.httpGetPerformances();
    }

    getPending(performances: Performance[]) {
        /*

        */

        // does exactly the same as above
        return performances.map(p => p.sessions
            .map(s => s.seats
                .map(row => row
                    .filter(seat => seat.availability === Availability.Pending)
                    .length)
                .reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val, 0))
            .reduce((acc, val) => acc + val, 0);
    }

    showViewers() {
        console.log(this.psv.performances);
    }
}
