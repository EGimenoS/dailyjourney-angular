import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from 'src/app/core/interfaces/travel';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent implements OnInit {
  @Input() travels$: Observable<Travel[]>;
  constructor() {}

  ngOnInit(): void {}
}
