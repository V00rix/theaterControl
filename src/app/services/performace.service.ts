import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Response, Http} from '@angular/http';
import {Performance} from '../models/performance';
import 'rxjs/Rx';
import {copyObj} from '@angular/animations/browser/src/util';
import {Session} from '../models/session';

@Injectable()
export class PerformanceService {
    /* Variables */
    performancesChanged = new Subject<Performance[]>();

    /* Selected Performance ID */
    public pid: number;
    /* Selected Session ID */
    public sid: number;
    /* Array of performances */
    performances: Performance[];

    /* Urls for GET/PUT/... */
    public getUrl = 'http://elumixor.com/theater/php/requests/admin/getPerformances.php';
    public putUrl = 'http://elumixor.com/theater/php/requests/admin/savePerformances.php';

    /* Constructor */
    constructor(private http: Http) {
        this.pid = 0; // there is always a selected performance
        this.sid = null; // session gets specified due to some actions
        this.httpGetPerformances(); // switch
    }

    // TODO: this should be gotten from server
    public getPerformances(): Performance[] {
        return this.performances;
    }


    public addPerformance(performance: Performance): void {
        this.performances.push(performance);
        this.performancesChanged.next(this.performances);
    }

    public deletePerformance(pid: number): void {
        this.checkPid(pid);
        this.performances.splice(pid, 1);
        if (pid === this.pid) {
            this.pid = 0;
        }
        this.performancesChanged.next(this.performances);
    }

    public deleteSession(pid: number, sid: number): void {
        this.checkPid(pid);
        this.performances[pid].sessions.splice(sid, 1);
        this.performancesChanged.next(this.performances);
    }


    checkPid(pid: number): void {
        if (!pid && pid !== 0) {
            throw new Error('Performance ID (' + pid + ') is not a valid number!');
        }
        if (pid > this.performances.length - 1) {
            throw new Error('Performance ID (' + pid + ') exceeds total number of performances (' + this.performances.length + ')!');
        }
        if (pid < 0) {
            throw new Error('Performance ID (' + pid + ') is less then zero!');
        }
    }


    httpStorePerformances(): void {
        this.http.post(this.putUrl, this.getPerformances().map(p => {
            return {
                title: p.title,
                description: p.description,
                imageUrl: p.imageUrl,
                sessions: p.sessions.map(s => {
                    return {
                        date: s.date.getTime(),
                        seats: s.seats
                    };
                })
            };
        }))
            .subscribe(
                (response: Response) => {
                    console.log('Response status: ' + response.statusText);
                },
                (error: Response) => {
                    console.log(error);
                });
    }

    httpGetPerformances(): void {
        this.performances = [];
        this.http.get(this.getUrl).subscribe(
            (response: Response) => {
                console.log(response);
                this.performances = <Performance[]>response.json();
                this.performances.forEach(p => p.sessions.forEach(s => {
                    s.date = new Date(parseInt(<string>s.date));
                }));
                console.log(this.performances);
                this.performancesChanged.next(this.performances);
            },
            error => {
                console.log(error);
            });
    }
}
