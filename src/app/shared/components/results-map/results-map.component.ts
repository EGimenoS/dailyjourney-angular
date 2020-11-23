import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-results-map',
  templateUrl: './results-map.component.html',
  styleUrls: ['./results-map.component.scss'],
})
export class ResultsMapComponent implements OnInit {
  mapOptions: MapOptions;
  constructor() {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  private initializeMapOptions(): void {
    this.mapOptions = {
      center: latLng(51.505, 0),
      zoom: 5,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }
}
