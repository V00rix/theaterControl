import {Viewer} from './viewer';

export class Seat {
  constructor(public availability: Availability, public viewer?: Viewer) {
  }
}

export enum Availability {
  Hidden,
  Pending,
  Booked,
  Available
}
