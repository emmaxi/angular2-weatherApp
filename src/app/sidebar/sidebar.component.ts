import { Component, OnInit } from '@angular/core';
import {Profile} from "../profile/profile";
import {ProfileService} from "../profile/profile.service";
import {WeatherService} from "../weather/weather.service";
import {WeatherItem} from "../weather/weather-item";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  profiles: Profile[];

  constructor(private _profileService: ProfileService, private _weatherService: WeatherService) { }

  ngOnInit() {
    this.profiles = this._profileService.getProfiles();
  }

  onAddNew(profile: Profile) {
    const cities = this._weatherService.getWeatherItems().map(function (element: WeatherItem){
      return element.cityName;
    });
    this._profileService.addNewProfile(cities);
  }

  onLoadProfile(profile: Profile){
    this._weatherService.clearWeatherItem();
    for (let i = 0; i < profile.cities.length;i++) {
      this._weatherService.searchWeatherData(profile.cities[i])
          .retry()
          .subscribe(
            data => {
              const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
              this._weatherService.addWeatherItem(weatherItem);
            }
          );
    }
  }

  onDeleteProfile(event: Event, profile: Profile) {
    event.stopPropagation();
    this._profileService.deleteProfile(profile);
  }
}
