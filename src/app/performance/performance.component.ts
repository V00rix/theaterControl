import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Performance} from '../models/performance';
import {Session} from '../models/session';

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

    constructor() {
    }

    ngOnInit() {
    }

    performanceDelete() {
        this.performanceDeleted.emit();
    }

    sessionAdd() {
        this.performance.sessions.push(Session.BasicSession());
    }

    sessionDelete(id: number) {
        this.sessionDeleted.emit(id);
    }

    performanceNameChanged(event: Event) {
        this.performance.title = (<HTMLInputElement>event.srcElement).value;
    }

    bgUrlChanged(event: Event) {
        this.performance.imageUrl = (<HTMLInputElement>event.srcElement).value;
    }

    descriptionValueChanged(event: Event) {
        this.performance.description = (<HTMLInputElement>event.srcElement).value;
    }

    onBlur() {

    }
}
