import { NgModule } from '@angular/core';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultsListComponent } from './results-list/results-list.component';

@NgModule({
  declarations: [SearchResultsComponent, ResultsListComponent],
  imports: [SharedModule, SearchResultsRoutingModule],
})
export class SearchResultsModule {}
