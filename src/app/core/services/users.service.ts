import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { authEndpoint, endpoint } from '../../../../config';
import { ApiResponse } from '../interfaces/api-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { UserSession } from '../interfaces/user-session';
import { AuthService } from './auth.service';
import { ErrorsService } from './errors.service';
import { TravelsService } from './travels.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = `${endpoint}/user`;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private errorsService: ErrorsService,
    private uiService: UiService,
    private router: Router,
    private travelsService: TravelsService
  ) {}
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  public createNewUser(credentials: UserCredentials): Observable<HttpResponse<ApiResponse>> | null {
    return this.http
      .post<ApiResponse>(`${authEndpoint}/sign_up`, credentials, {
        headers: this.headers,
        observe: 'response' as const,
      })
      .pipe(
        tap((response) => {
          const token = response.headers.get('Access-Token');
          this.authService.setUser(token);
        }),
        tap(() => this.travelsService.setTravelsForCurrentUser()),
        tap(() => this.dialog.closeAll()),
        tap(() =>
          this.uiService.openSnackBar({
            message: `${credentials.name} registrado con éxito 😃`,
            class: 'success',
          })
        ),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Registro de usuario');
          return of(null);
        })
      );
  }

  public updateUserData(payload: UserSession): Observable<HttpResponse<ApiResponse>> | null {
    return this.http
      .put<ApiResponse>(this.url, payload, {
        headers: this.headers,
        observe: 'response' as const,
      })
      .pipe(
        tap((response) => {
          const token = response.headers.get('Access-Token');
          this.authService.setUser(token);
        }),
        tap(() =>
          this.uiService.openSnackBar({
            message: `${payload.name} actualizado con éxito 😃`,
            class: 'success',
          })
        ),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Actualización de perfil usuario');
          return of(null);
        })
      );
  }

  public changePassword(
    credentials: UserCredentials
  ): Observable<HttpResponse<ApiResponse>> | null {
    return this.http
      .patch<ApiResponse>(`${authEndpoint}/passwords`, credentials, {
        headers: this.headers,
        observe: 'response' as const,
      })
      .pipe(
        tap(() => {
          this.router.navigateByUrl('home');
          this.authService.logout();
        }),
        tap(() =>
          this.uiService.openSnackBar({
            message: 'Password actualizado con éxito 😃',
            class: 'success',
          })
        ),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Actualización de password');
          return of(null);
        })
      );
  }
}
