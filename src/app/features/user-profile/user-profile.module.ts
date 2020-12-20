import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { PasswordComponent } from './password/password.component';
import { GeneralComponent } from './general/general.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UserProfileComponent, PasswordComponent, GeneralComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDividerModule,
    UserProfileRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class UserProfileModule {}
