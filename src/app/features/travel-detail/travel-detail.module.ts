import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelDetailRoutingModule } from './travel-detail-routing.module';
import { TravelDetailComponent } from './travel-detail.component';


@NgModule({
  declarations: [TravelDetailComponent],
  imports: [
    CommonModule,
    TravelDetailRoutingModule
  ]
})
export class TravelDetailModule { }
