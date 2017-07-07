import { Injectable } from '@angular/core';
import {Profile} from "./profile";

@Injectable()
export class ProfileService {

  private profiles: Profile[] = [];

  constructor() { }

  addNewProfile(cities: string[]) {
    const profileName = 'Profile ' + this.profiles.length;
    const profile = new Profile(profileName, cities);
    this.profiles.push(profile);
  }

  getProfiles() {
    return this.profiles;
  }

  deleteProfile(profile: Profile) {
    this.profiles.splice(this.profiles.indexOf(profile), 1);
  }
}
