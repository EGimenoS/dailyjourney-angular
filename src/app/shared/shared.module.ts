import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchAddresesFormComponent } from './components/search-addreses-form/search-addreses-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchAddresesFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SearchAddresesFormComponent,
  ],
})
export class SharedModule {}
