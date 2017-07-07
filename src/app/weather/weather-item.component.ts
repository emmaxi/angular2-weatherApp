import { Component, OnInit, Input } from '@angular/core';
import {WeatherItem} from "./weather-item";

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css'],
  // internal we are using weatherItem, externally we are using item, communicate father and child component
  // inputs: ['weatherItem: item']
})
export class WeatherItemComponent implements OnInit {
  // internal we are using weatherItem, externally we are using item, communicate father and child component
  // same affection as inputs in @Component
  @Input('item') weatherItem: WeatherItem;

  ngOnInit() {
  }

}
