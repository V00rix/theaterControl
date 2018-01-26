import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Availability, Seat} from '../../../models/seat';
import {Viewer} from '../../../models/viewer';

@Component({
    selector: 'app-scene',
    templateUrl: './scene.component.html',
    styleUrls: ['./scene.component.scss'],
    // animations: [
    // 	Animations.inOpacityScale, Animations.slideIn, Animations.fadeIn
    // ]
})
export class SceneComponent implements OnInit {
    @Input() seats: Seat[][];
    selectedSeat = {r: -1, s: -1};
    seatsOnCreation = 10;
    viewer: Viewer;
    popupDisplayed = false;
    popupCoords: { x: number, y: number } = {x: 0, y: 0};
    public zoomFactor = 1;
    @Output() deleteSession = new EventEmitter<void>();
    @ViewChild('scrollElement') scrollElement;

    constructor() {
    }

    ngOnInit(): void {
    }

    public getLongestRow(): number {
        let highestCount = 0;
        for (const row of this.seats) {
            if (row.length > highestCount) {
                highestCount = row.length;
            }
        }
        return highestCount;
    }

    public addRow(): void {
        if (this.seatsOnCreation) {
            this.seats.push([]);
            for (let i = 0; i < this.seatsOnCreation; ++i) {
                this.seats[this.seats.length - 1].push(new Seat(Availability.Available));
            }
        } else {
            if (this.seats === undefined || this.seats.length === 0) {
                this.seats = [];
                this.seats.push([]);
                this.seats[0].push(new Seat(Availability.Available));
            } else {
                this.seats.push([]);
                for (let i = 0; i < this.seats[this.seats.length - 2].length; ++i) {
                    this.seats[this.seats.length - 1].push(new Seat(this.seats[this.seats.length - 2][i].availability));
                }
                console.log(this.seats);
            }
        }
    }

    public deleteRow(row: number): void {
        this.seats.splice(row, 1);
    }

    creationSeats(val) {
        this.seatsOnCreation = val;
    }

    addSeat(row: number) {
        if (row !== undefined) {
            this.seats[row].push(new Seat(Availability.Available));
        } else {
            this.seats[this.selectedSeat.r].splice(this.selectedSeat.s, 0, new Seat(Availability.Available));
        }
        this.popupDisplayed = false;
    }

    onConfirmed(val: boolean) {
        if (val) {
            this.seats[this.selectedSeat.r][this.selectedSeat.s].availability = Availability.Booked;
        } else {
            this.viewer = this.seats[this.selectedSeat.r][this.selectedSeat.s].viewer = null;
            this.seats[this.selectedSeat.r][this.selectedSeat.s].availability = Availability.Available;
        }
    }

    deleteSeat(row: number) {
        if (row !== undefined) {
            this.seats[row].pop();
        } else {
            this.seats[this.selectedSeat.r].splice(this.selectedSeat.s, 1);
        }
        this.popupDisplayed = false;
    }

    showViewer(event, row, seat) {
        if (row !== undefined && seat !== undefined) {
            this.selectedSeat.r = row;
            this.selectedSeat.s = seat;
            this.viewer = this.seats[row][seat].viewer;
        } else {
            this.viewer = this.seats[this.selectedSeat.r][this.selectedSeat.s].viewer;
        }
        this.popupDisplayed = false;
    }

    public getClass(row: number, seat: number) {
        switch (this.seats[row][seat].availability) {
            case Availability.Hidden:
                return {'inactive': true};
            case Availability.Booked:
                return {'booked': true};
            case Availability.Pending:
                return {'pending': true};
            case Availability.Available:
                return {'available': true};
        }
    }

    hideSeat() {
        this.seats[this.selectedSeat.r][this.selectedSeat.s].availability = Availability.Hidden;
        this.popupDisplayed = false;
    }

    showSeat() {
        this.seats[this.selectedSeat.r][this.selectedSeat.s].availability = Availability.Available;
        this.popupDisplayed = false;
    }

    /* Select seats, add to/remove from array */
    public onSeatSelected(event: MouseEvent, row: number, seat: number): boolean {
        this.selectedSeat.r = row;
        this.selectedSeat.s = seat;
        this.popupCoords.x = event.x;
        this.popupCoords.y = event.y;
        this.popupDisplayed = true;
        return false;

        // if (event.srcElement.classList.contains("booked") ||
        // 	event.srcElement.classList.contains("pending") ||
        // 	event.srcElement.classList.contains("inactive"))
        // 	return;
        // var index: number = this.selectedSeats.indexOf(event.srcElement, 0);
        // if (index > -1) {
        // 	event.srcElement.classList.remove("selected");
        // 	this.selectedSeats.splice(index, 1);
        // 	this.seats.splice(index, 1);
        // }
        // else {
        // 	event.srcElement.classList.add("selected");
        // 	this.selectedSeats.push(event.srcElement);
        // 	var s = this.session.seats[row][seat];
        // 	s.fromScreen = this.session.seats.length - row;
        // 	s.fromLeft = seat + 1;
        // 	if (!s.viewer)
        // 		s.viewer = new Viewer();
        // 	this.seats.push(s);
        // }
    }

    displayFields(display: boolean): void {
        // this.fields = this.seats.length && display;
    }

    displayMessage(display: boolean) {
        // this.message.emit(display);
    }

    cancelSeat(event) {
        // var index: number = this.seats.indexOf(event, 0);
        // if (index > -1) {
        // 	this.seats.splice(index, 1);
        // 	this.selectedSeats[index].classList.remove("selected");
        // 	this.selectedSeats.splice(index, 1);
        // }
        // if (this.seats.length === 0) {
        // 	this.fields = false;
        // }
    }

    onScroll(value: number, event) {
        const el = <HTMLElement>this.scrollElement.nativeElement;
        // console.log(window.scroll);
        // console.log(event);
        // console.log(Math.floor(event.offsetX / el.offsetWidth * 100) + "% "
        // + Math.floor(event.offsetY / el.offsetHeight * 100) + "%");
        if (this.zoomFactor + value >= 1 && this.zoomFactor + value <= 2.5) {
            // console.log("scroll to" + (el.offsetHeight / this.zoomFactor));
            // el.scrollBy(0, el.offsetHeight / this.zoomFactor  / 2);
            this.zoomFactor += value;
            // console.log(<HTMLElement>this.scrollElement);

        }
    }

    smallScreen() {
        return (window.innerWidth < 992);
    }
}
