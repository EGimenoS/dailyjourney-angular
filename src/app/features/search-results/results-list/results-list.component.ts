import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent implements OnInit, OnChanges {
  @Input() travels$: Observable<Travel[]>;
  @Input() travelToAnimate: number;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('change detected: ', this.travelToAnimate);
  }
}
