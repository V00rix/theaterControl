import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertiesPipe } from '../pipes/properties.pipe';
import { Performance, Session, Availability, Seat } from '../shared/data.model';

@Component({
	selector: 'app-performance',
	templateUrl: './performance.component.html',
	styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
	@Input() performance: Performance;
	@Output() performanceDeleted = new EventEmitter<void>();
	@Output() sessionAdded = new EventEmitter<void>();
	@Output() sessionDeleted = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {	}

	performanceDelete() {	
		this.performanceDeleted.emit();
	}

	sessionAdd() {
		this.performance.Sessions.push(Session.BasicSession());	
	}

	sessionDelete(id: number) {
		this.sessionDeleted.emit(id);
	}

	descriptionAdd() {
		if (!this.performance.info) 
			this.performance.info = [];		
		this.performance.info.push({key: "Parameter", value: "Value"});
	}

	performanceNameChanged(event: Event) {
		var value = (<HTMLInputElement>event.srcElement).value; 
		this.performance.Performance_name = value;
	} 
	
	bgUrlChanged(event: Event) {
		var value = (<HTMLInputElement>event.srcElement).value; 
		this.performance.Background_url_path = value;
	}

	descriptionValueChanged(event: Event,  id: number) {
		var value = (<HTMLInputElement>event.srcElement).value; 
		this.performance.info[id].value = value;
	}

	descriptionKeyChanged(event: Event,  id: number) {
		var value = (<HTMLInputElement>event.srcElement).value; 
		this.performance.info[id].key = value;
	}

	onBlur() {

	}

	descriptionDelete(id: number) {
		this.performance.info.splice(id, 1);
	}
}
