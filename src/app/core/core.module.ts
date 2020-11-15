// includes basic layout and all the core singleton services which will be used throughout the whole application

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
// component imports
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, MatIconModule, HttpClientModule],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
