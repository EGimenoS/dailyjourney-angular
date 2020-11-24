import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeafletBaseLayersDirective } from '@asymmetrik/ngx-leaflet';
import { latLng, MapOptions, tileLayer, Map, Marker, icon } from 'leaflet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-results-map',
  templateUrl: './results-map.component.html',
  styleUrls: ['./results-map.component.scss'],
})
export class ResultsMapComponent implements OnInit, OnChanges {
  @Input() travels$: Observable<Travel[]>;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;
  originMarkers$: Observable<Marker[]>;
  destinationMarkers$: Observable<Marker[]>;
  mapOptions: MapOptions;
  map: Map;
  constructor() {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  ngOnChanges(): void {
    this.originMarkers$ = this.travels$.pipe(
      map((travels) => {
        return travels.map((travel) =>
          this.addMarker(travel.origin.latitude, travel.destination.longitude)
        );
      })
    );
    this.map.fitBounds([
      [this.userOrigin.latitude, this.userOrigin.longitude],
      [this.userDestination.latitude, this.userDestination.longitude],
    ]);
  }

  addMarker(lat, long): Marker {
    return new Marker([lat, long]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
  }

  onMapReady(mapEvent: Map): void {
    this.map = mapEvent;
    this.map.fitBounds([
      [this.userOrigin.latitude, this.userOrigin.longitude],
      [this.userDestination.latitude, this.userDestination.longitude],
    ]);
  }

  private initializeMapOptions(): void {
    this.mapOptions = {
      center: latLng(this.userDestination.latitude, this.userDestination.longitude),
      zoom: 20,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }
}
