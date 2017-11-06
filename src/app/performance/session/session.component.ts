import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PropertiesPipe } from '../../pipes/properties.pipe';
import { Performance, Session, Availability, Seat } from '../../shared/data.model';

@Component({
	selector: 'app-session',
	templateUrl: './session.component.html',
	styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
	@Input() session: Session;
	@Output() sessionDeleted = new EventEmitter<void>();
	constructor() { }

	ngOnInit() {
	}

	sessionDelete() {
		this.sessionDeleted.emit();
	}

	dateChanged(event: Event) {
		var value = <string>(<HTMLInputElement>event.srcElement).value; 
		console.log(value);		
		this.session.date = new Date(value);
	}

}
