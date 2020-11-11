import { NgModule } from '@angular/core';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [SharedModule, SearchResultsRoutingModule],
})
export class SearchResultsModule {}
