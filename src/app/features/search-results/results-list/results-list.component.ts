import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/core/interfaces/participant';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent implements OnInit, OnChanges {
  @Input() travelToAnimate: number;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;
  @Input() travels: Travel[];
  @Input() isSearching: boolean;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log('change detected: ', this.travelToAnimate);
  }

  getNumberOfApprovedParticipants(participants: Participant[]): number {
    return participants.filter((participant) => participant.status === 'approved').length;
  }
}
