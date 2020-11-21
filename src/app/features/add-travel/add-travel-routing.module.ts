import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTravelComponent } from './add-travel.component';

const routes: Routes = [{ path: '', component: AddTravelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTravelRoutingModule { }
