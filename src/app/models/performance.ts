import {Session} from './session';

export class Performance {
  constructor(public title: String,
              public description: String,
              public imageUrl: String = null,
              public sessions: Session[]) {
  }
}
