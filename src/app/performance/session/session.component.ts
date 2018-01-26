import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Session} from '../../models/session';

@Component({
    selector: 'app-session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
    @Input() session: Session;
    @Output() sessionDeleted = new EventEmitter<void>();
    public date = new Date();

    constructor() {
    }

    ngOnInit() {
        this.date = new Date(this.session.date.getTime() + 60000 * this.session.date.getTimezoneOffset());
        console.log(this.date);
    }

    sessionDelete() {
        this.sessionDeleted.emit();
    }

    dateChanged(event: Event, type: string) {
        const value = <string>(<HTMLInputElement>event.srcElement).value || '1';
        console.log(value);
        switch (type) {
            case 'day':
                this.date.setDate(parseInt(value));
                break;
            case 'month':
                this.date.setMonth(parseInt(value) - 1);
                break;
            case 'year':
                this.date.setFullYear(parseInt(value));
                break;
            case 'hours':
                this.date.setHours(parseInt(value));
                break;
            case 'minutes':
                this.date.setMinutes(parseInt(value));
                break;
            default:
                break;
        }
        console.log(this.date, this.session.date);
        this.session.date = new Date(this.date.getTime() - 60000 * this.date.getTimezoneOffset());
    }

}
