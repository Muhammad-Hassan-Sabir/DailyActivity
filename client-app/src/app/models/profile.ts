import { Photo } from "./photo";
import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.userName;
    this.displayName = user.displayName;
    this.image = user.image;
  }
}

export class EditProfileFormValues {
  displayName: string = "";
  bio: string = "";

  constructor(profile?: Profile|null) {
    if (profile) {
      this.bio = profile.bio == undefined?"":profile.bio;
      this.displayName = profile.displayName;
    }
  }
}
