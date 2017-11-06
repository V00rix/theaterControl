import { Injectable } from '@angular/core';
import { Performance, Session, Availability, Seat } from '../shared/data.model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs/Subscription";
import { Response, Http } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class PerformanceService {
	/* Variables */
	performancesChanged = new Subject<{performances: Performance[], pid: number, sid: number}>();
	subscription: Subscription;
	public tempPerf;

	/* Selected Performance ID */	
	public pid: number;
	/* Selected Session ID */
	public sid: number;
	/* Array of performances */
	public
	performances: Performance[];

	/* Urls for GET/PUT/... */
	public getUrl = 'https://perfoseats.firebaseio.com/perfoseats.json';
	public putUrl = 'https://perfoseats.firebaseio.com/perfoseats.json';

	/* Constructor */
	constructor(private http: Http) {
		this.pid = 0; // there is always a selected performance
		this.sid = null; // session gets specified due to some actions
		this.httpGetPerformances(); // switch
		// this.generatePerformances(); // switch
		// sort performances
		// for (let perf of this.performances) {
			// 	var arr = perf.Sessions;
			// 	arr.sort((a,b) => {
				// 		if (a.date < b.date)
				// 			return 0;
				// 		else 
				// 			return 1;
				// 	});
				// }
			}

			public selectedPerformance(): Performance {
				return this.performances[this.pid];
			}

			public selectedSession(): Session {		
				return this.performances[this.pid].Sessions[this.sid];
			}

			public selectPerformance(pid: number): void {
				this.checkPid(pid);
				this.pid = pid;
				this.sid = null;
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
			}

			public selectSession(sid: number): void {
				this.checkSid(sid, this.selectedPerformance());
				this.sid = sid;
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});
			}

			public selectPS(pid: number, sid: number): void {
				this.pid = pid;
				this.sid = sid;
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			getFilteredPerformances(): Performance[] {
				let arr = this.performances.slice();
				for (let perf of arr)
					perf.Sessions = perf.getFilteredSessions();
				return arr;
			}

			// TODO: this should be gotten from server
			public getPerformances(): Performance[] {
				return this.performances;
			}

			public getPerformance(pid: number): Performance {
				this.checkPid(pid);
				return this.performances[pid];
			}

			public addPerformance(Performance: Performance): void {
				this.performances.push(Performance);
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});			
			}

			public updatePerformance(pid: number, Performance: Performance): void {
				this.checkPid(pid);
				this.performances[pid] = Performance;
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			public deletePerformance(pid: number): void {
				this.checkPid(pid);
				this.performances.splice(pid, 1);	
				if (pid === this.pid) 
					this.pid = 0;
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			public deleteSession(pid: number, sid: number): void {
				this.checkPid(pid);
				this.performances[pid].Sessions.splice(sid, 1);	
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			public loadPerformances(performances: Performance[]): void {
				this.performances = performances;			
				this.tempPerf = this.performances.slice();
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			revertPerformances(): void {
				this.performances = this.tempPerf.slice();
				this.performancesChanged.next({performances: this.performances, pid: this.pid, sid: this.sid});	
			}

			// select next through performances
			public nextPerformance(): void {
				let spid = this.pid + 1;
				spid = spid === this.performances.length ? 0 : spid;
				this.selectPerformance(spid);
			}

			checkPid(pid: number): void {		
				if (!pid && pid !== 0) 
					throw new Error("Performance ID (" + pid + ") is not a valid number!");
				if (pid > this.performances.length - 1)
					throw "Performance ID (" + pid + ") exceeds total number of performances (" + this.performances.length + ")!";
				if (pid < 0)
					throw "Performance ID (" + pid + ") is less then zero!";
			}

			checkSid(sid: number, performance: Performance): void {
				if (!sid && sid !== 0) 
					throw new Error("Session id (" + sid + ") is not a valid number!");
				if (sid > performance.Sessions.length - 1)
					throw "Session ID (" + sid + ") exceeds total number of Sessions ("
				+ performance.Sessions.length + ")!";
				if (sid < 0)
					throw "Session ID (" + sid + ") is less then zero!";
			}

			httpStorePerformances(): void {
				console.log(this.getPerformances());
				this.http.put(this.putUrl, this.getPerformances())
				.subscribe(
					(response: Response) => {
						console.log("Response status: " + response.statusText);
					},
					(error: Response) => {
						console.log(error);
					});
			}
			httpGetPerformances(): void {
				this.performances = [];
				this.http.get(this.getUrl)
				.map(
					(response: Response) => {
						console.log(response);				
						const performances: Performance[] = [];				
						if (<Performance[]>response.json() !== null) {
							for (let performance of <Performance[]>response.json()) {
								performances.push(new Performance(performance.Performance_name,
									performance.Background_url_path, []));
								performances[performances.length - 1].info = performance.info;
								if (<Session[]>performance.Sessions !== undefined) {
									for (let session of <Session[]>performance.Sessions) {
										if (session.seats === undefined) {
											session.seats = [];						
										console.log(session.seats);
										}
										performances[performances.length - 1].Sessions.push(new Session(new Date(session.date), session.seats));
									}
								}
							};
						}
						return performances;
					},
					(error: Response) => {
						console.log(error);
					}
					)
										.subscribe(
											(performances: Performance[]) => {
												this.loadPerformances(performances);
											});
									}
								}