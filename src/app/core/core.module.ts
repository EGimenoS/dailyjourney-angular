// includes basic layout and all the core singleton services which will be used throughout the whole application

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
// component imports
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ScrollToBottomDirective } from './directives/scroll-tobottom.directive';
import { AlertComponent } from './components/alert/alert.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

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
    ScrollToBottomDirective,
    AlertComponent,
    SnackbarComponent,
    LoadingSpinnerComponent,
    ConfirmationComponent,
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
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: token,
        allowedDomains: [`${environment.baseDom}`],
        disallowedRoutes: [`${environment.authUrl}/sign_in`, `${environment.authUrl}/sign_up`],
      },
    }),
  ],
  exports: [MainLayoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
})
export class CoreModule {}
