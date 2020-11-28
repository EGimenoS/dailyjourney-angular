import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss'],
})
export class TravelInfoComponent implements OnInit {
  @Input() travels$: Observable<Travel[]>;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;

  travel$: Observable<Travel>;
  constructor() {}

  ngOnInit(): void {
    this.travel$ = this.travels$.pipe(map((travel) => travel[0]));
  }
}
