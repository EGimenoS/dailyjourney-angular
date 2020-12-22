import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';
import { TravelsService } from 'src/app/core/services/travels.service';
import { ActivatedRoute } from '@angular/router';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  travels$: Observable<Travel[]>;
  travels: Travel[];
  userOrigin: GeoPosition;
  userDestination: GeoPosition;
  travelToAnimate: number;
  isSearching: boolean;
  constructor(private travelsService: TravelsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isSearching = Object.keys(params).length === 0 ? false : true;
      this.userOrigin = {
        address: params.origin_address,
        latitude: params.origin_latitude,
        longitude: params.origin_longitude,
      };
      this.userDestination = {
        address: params.destination_address,
        latitude: params.destination_latitude,
        longitude: params.destination_longitude,
      };
      this.travelsService
        .getTravelsNearOfDestination(params.destination_latitude, params.destination_longitude)
        .subscribe((travels) => (this.travels = travels));
    });
  }
  handleClickedMarker(id): void {
    this.travelToAnimate = id;
  }
}
