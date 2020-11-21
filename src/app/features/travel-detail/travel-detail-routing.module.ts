import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelDetailComponent } from './travel-detail.component';

const routes: Routes = [{ path: '', component: TravelDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelDetailRoutingModule { }
