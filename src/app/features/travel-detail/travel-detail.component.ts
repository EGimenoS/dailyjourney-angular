import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Travel } from 'src/app/core/interfaces/travel';
import { TravelsService } from 'src/app/core/services/travels.service';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.scss'],
})
export class TravelDetailComponent implements OnInit {
  travel: Travel[];
  travelID: string;
  toggle = false;
  constructor(private travelsService: TravelsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => (this.travelID = params.id)),
        mergeMap((params) => this.travelsService.getTravelDetail(this.travelID))
      )
      .subscribe((travel) => (this.travel = travel));
  }

  fetchDataFromServer(): void {
    this.travelsService
      .getTravelDetail(this.travelID)
      .subscribe((travel) => (this.travel = travel));
  }
}
