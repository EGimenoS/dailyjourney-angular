import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';
import { TravelsService } from 'src/app/core/services/travels.service';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.scss'],
})
export class TravelDetailComponent implements OnInit {
  travel$: Observable<Travel[]>;
  userOrigin: GeoPosition;
  userDestination: GeoPosition;
  travelID: string;
  constructor(private travelsService: TravelsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.travelID = this.route.snapshot.paramMap.get('id');
    this.travel$ = this.travelsService.getTravelDetail(this.travelID);
  }
}
