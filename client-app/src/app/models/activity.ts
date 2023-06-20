import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  city: string;
  category: string;
  date: Date | null;
  venue: string;
  hostUsername: string;
  attendees: Profile[];
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
}

export class Activity implements Activity {
  constructor(init?:ActivityFormValues) {
    Object.assign(this,init)
  }
}


export class ActivityFormValues {
  id?: string = undefined;
  title: string = "";
  description: string = "";
  city: string = "";
  category: string = "";
  date: Date | null = null;
  venue: string = "";
  constructor(activity?: ActivityFormValues) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.description = activity.description;
      this.city = activity.city;
      this.category = activity.category;
      this.date = activity.date;
      this.venue = activity.venue;
    }
  }
}
