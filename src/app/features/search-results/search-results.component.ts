import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';
import { TravelsService } from 'src/app/core/services/travels.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  travels$: Observable<Travel[]>;
  constructor(private travelsService: TravelsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) =>
        (this.travels$ = this.travelsService.getTravelsNearOfDestination(
          params.destination_latitude,
          params.destination_longitude
        ))
    );
  }
}
