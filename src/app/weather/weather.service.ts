import { Injectable } from '@angular/core';
import {WEATHER_ITEMS} from "./weather.data";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import 'rxjs/RX';
import {WeatherItem} from "./weather-item";

@Injectable()
export class WeatherService {

  constructor(private _http: Http) { }

  getWeatherItems(){
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=201cbf11fe1cbf3e4f94fc015540abe4&units=metric')
      .map(respone => respone.json())
      .catch(error => {
        console.error(error);
        return Observable.throw(error.json());
      });
  }

  clearWeatherItem() {
    // delete the whole array
    WEATHER_ITEMS.splice(0);
  }
}
