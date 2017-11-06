import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable"
import { PerformanceService } from './services/performace.service';
import { Performance, Session, Availability, Seat } from './shared/data.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	private performances$: Observable<any>;

	constructor(public psv: PerformanceService) {}

	ngOnInit() {
		this.performances$ = this.psv.performancesChanged.map(() => 
		{ 
			return this.psv.performances;
		});
	}

	performanceAdd(performances: Performance[]) {
		this.psv.addPerformance(new Performance());
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
		let pNumber = 0;
		for (let p of performances) {
			for (let s of p.Sessions) {
				for (let row of s.seats) {
					for (let seat of row) {
						if (seat.availability === Availability.Pending) {
							pNumber++;
						}
					}
				}
			}
		} 
		*/
	
		// does exactly the same as above 
		return performances.map(p => p.Sessions
			.map(s => s.seats
				.map(row => row
					.filter(seat => seat.availability === Availability.Pending)
					.length)
				.reduce((acc, val) => acc + val, 0))
			.reduce((acc, val) => acc + val, 0))
		.reduce((acc, val) => acc + val, 0);
	}
}
