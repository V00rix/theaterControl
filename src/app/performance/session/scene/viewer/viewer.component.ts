import {Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Performance, Session, Seat, Viewer, Availability } from '../../../../shared/data.model';

@Component({
	selector: 'app-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
	@Input() viewer: Viewer; 
	@Output() confirmed = new EventEmitter<boolean>();
	constructor() { }

	ngOnInit() {
	}

	optionalFields() {
		return this.viewer.VK === Viewer._VK ? "" : this.viewer.VK +   	
		this.viewer.WhatsApp === Viewer._WhatsApp ? "": this.viewer.WhatsApp +
		this.viewer.Viber=== Viewer._Viber ? "": this.viewer.Viber +
		this.viewer.Telegram=== Viewer._Telegram ? "" : this.viewer.Telegram;
	}
}
