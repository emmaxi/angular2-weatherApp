import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../weather.service";
import {WeatherItem} from "../weather-item";
import {Subject} from "rxjs/Subject";


@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  private searchStream = new Subject<string>();
  data: any = {};

  //wei le yan shi xia la cai dan
  powers= ['aaa', 'bbb', 'ccc', 'ddd'];

  weatherItems: WeatherItem[];

  constructor(private _weatherService: WeatherService){
  }

  ngOnInit() {
    this.weatherItems = this._weatherService.getWeatherItems();
    this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((input:string) => this._weatherService.searchWeatherData(input))
      .subscribe(
        data => this.data = data
      );
  }

  onSubmit(form){
    this._weatherService.searchWeatherData(form.value.city)
      .subscribe(
        data => {
          const weatherItem = new WeatherItem(data.name,
                                              data.weather[0].description,
                                              data.main.temp);
          this._weatherService.addWeatherItem(weatherItem);
        }
      );
  }

  onSearchLocation(cityName: string) {
    this.searchStream
        .next(cityName);
  }




}
