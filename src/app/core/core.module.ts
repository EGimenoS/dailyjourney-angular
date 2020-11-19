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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

export function token(): string {
  if (localStorage.getItem('currentUser')) {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  } else {
    return 'notoken';
  }
}

@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: token,
        allowedDomains: [`${environment.baseDom}`],
        disallowedRoutes: [`${environment.authUrl}/sign_in`, `${environment.authUrl}/sign_up`],
      },
    }),
  ],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
