export class Performance {
	public info: { key: string, value: string }[] = null;
	constructor(public Performance_name: string = "[Performance name]",
		public Background_url_path: string = null,
		public Sessions: Session[] = [],
		...infoFields: { key: string, value: string }[]) {
		this.info = infoFields;
	}

	public getFilteredSessions(): Session[] {
		this.Sessions.filter((val, ind, arr) => {
			if (ind > 0) {
				if (val.date.getDate() !== arr[ind-1].date.getDate() ||
					val.date.getMonth() !== arr[ind-1].date.getMonth() || 
					val.date.getFullYear() !== arr[ind-1].date.getFullYear()) 
					return val;
			}
			else 
				return val;
		});
		return this.Sessions.slice();
	}

	public groupedSessions(): {day: Date, sessions: Session[]}[] {
		let res: {day: Date, sessions: Session[]}[] = [];
		this.Sessions.forEach((val, ind, arr) => {
			if (ind > 0) {
				if (val.date.getDate() !== arr[ind-1].date.getDate() ||
					val.date.getMonth() !== arr[ind-1].date.getMonth() || 
					val.date.getFullYear() !== arr[ind-1].date.getFullYear()) {
				res.push({day: new Date(val.date.getFullYear(), val.date.getMonth(), val.date.getDate()),
						sessions: [val]});
				}
				else {
					res[res.length-1].sessions.push(val);
				}
			}
			else 
				res.push({day: new Date(val.date.getFullYear(), val.date.getMonth(), val.date.getDate()),
						sessions: [val]});
		});
		return res;
	}
}

export class Session {
	constructor(
		public date: Date,
		public seats: Seat[][]) {}
	static BasicSession(): Session {
		let s = new Session(new Date(), []);
		for (var i = 0; i < 7; ++i) {
			s.seats.push([]);
			for (var j = 0; j < 10; ++j) {
				s.seats[i].push(new Seat(Availability.Available));
			}
		}
		return s;
	}
}

export class Seat {
	public fromScreen: number;
	public fromLeft: number;
	public viewer: Viewer;
	constructor(public availability: Availability) {}
}

export class Viewer {
	public static _Name = "Your Name";
	public static _Phone = "777-777-777";
	public static _Email = "your@mail.com";
	public static _VK = "vk.com/your_vk";
	public static _WhatsApp = "Your WhatsApp number";
	public static _Viber = "Your Viber number";
	public static _Telegram = "Your Telegram number";

	constructor(
		public Name: string = null, 
		public Phone: string = null,
		public Email: string = null, 
		public VK: string = null, 
		public WhatsApp: string = null, 
		public Viber: string = null, 
		public Telegram: string = null) {
		for (let property in this)
			if (!this[property])
				this[property] = Viewer['_' + property];
		}
	}

	export enum Availability {
		Hidden,
		Pending,
		Booked,
		Available,
	}
