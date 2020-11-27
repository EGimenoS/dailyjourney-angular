import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent implements OnChanges {
  @Input() travels$: Observable<Travel[]>;
  @Input() travelToAnimate: number;
  constructor() {}

  ngOnChanges(): void {
    console.log('change detected: ', this.travelToAnimate); // "change detected :undefined", fired only once
  }
}
