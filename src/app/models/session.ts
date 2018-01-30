import {Availability, Seat} from './seat';

export class Session {
    constructor(public date: any,
                public seats: Seat[][]) {
    }

    static BasicSession() {
        const session = new Session(new Date(), []);
        for (let i = 0; i < 10; i++) {
            session.seats.push([]);
            for (let j = 0; j < 20; j++) {
                session.seats[i].push(new Seat(Availability.Available));
            }
        }
        return session;
    }
}
