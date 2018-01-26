import {Input, Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Viewer} from '../../../../models/viewer';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
    @Input() viewer: Viewer;
    @Output() confirmed = new EventEmitter<boolean>();

    constructor() {
        console.log(this.viewer);
    }

    ngOnInit() {
    }

    optionalFields() {
        return this.viewer.VK || ' ' +
        this.viewer.whatsApp || ' ' +
        this.viewer.viber || ' ' +
        this.viewer.telegram || ' ';
    }
}
