import { Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output } from '@angular/core';
import {
  latLng,
  MapOptions,
  tileLayer,
  Map,
  Marker,
  icon,
  LatLngBounds,
  featureGroup,
} from 'leaflet';
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
  markers: Marker[];
  mapOptions: MapOptions;
  mapFitToBounds: LatLngBounds;
  map: Map;
  @Output() propagateTravelId = new EventEmitter<number>();
  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  ngOnChanges(): void {
    this.travels$
      .pipe(
        map((travels) => {
          return travels.map((travel) =>
            this.addDestinationMarker(
              travel.destination.latitude,
              travel.destination.longitude,
              travel.origin.address,
              travel.id
            )
          );
        })
      )
      .subscribe((markers) => {
        this.markers = markers;
        this.mapFitToBounds = featureGroup(this.markers).getBounds();
      });
  }

  addDestinationMarker(lat, long, address, id): Marker {
    return new Marker([lat, long])
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
        })
      )
      .bindPopup(`<h3>Salida desde: ${address}</h3>`)
      .on('click', () => {
        this.zone.run(() => this.propagateTravelId.emit(id));
      });
  }

  addUserMarker(lat, long): Marker {
    return new Marker([lat, long]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
  }
  private initializeMapOptions(): void {
    this.mapOptions = {
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
