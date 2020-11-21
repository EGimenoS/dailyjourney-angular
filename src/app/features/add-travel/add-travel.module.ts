import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTravelRoutingModule } from './add-travel-routing.module';
import { AddTravelComponent } from './add-travel.component';


@NgModule({
  declarations: [AddTravelComponent],
  imports: [
    CommonModule,
    AddTravelRoutingModule
  ]
})
export class AddTravelModule { }
