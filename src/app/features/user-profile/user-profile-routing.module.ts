import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { GeneralComponent } from './general/general.component';
import { PasswordComponent } from './password/password.component';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'general', pathMatch: 'full' },
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'general', component: GeneralComponent },
      { path: 'password', component: PasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
