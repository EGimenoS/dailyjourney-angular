import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchAddresesFormComponent } from './components/search-addreses-form/search-addreses-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsMapComponent } from './components/results-map/results-map.component';

@NgModule({
  declarations: [SearchAddresesFormComponent, ResultsMapComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    SearchAddresesFormComponent,
  ],
})
export class SharedModule {}
