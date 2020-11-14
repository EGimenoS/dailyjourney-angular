// includes basic layout and all the core singleton services which will be used throughout the whole application

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// component imports
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [MainLayoutComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule, MatIconModule, MatButtonModule],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
