import { Component, OnInit } from '@angular/core';
import {WeatherItem} from "./weather-item";
import {WeatherService} from "./weather.service";

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];

  //denpendency injection
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherItems = this._weatherService.getWeatherItems();
  }

}
