import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatIconModule, MatInputModule],
  exports: [CommonModule, RouterModule, MatFormFieldModule, MatIconModule, MatInputModule],
})
export class SharedModule {}
