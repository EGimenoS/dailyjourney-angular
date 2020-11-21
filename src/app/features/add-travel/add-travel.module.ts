import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTravelRoutingModule } from './add-travel-routing.module';
import { AddTravelComponent } from './add-travel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AddTravelComponent],
  imports: [
    CommonModule,
    AddTravelRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class AddTravelModule {}
