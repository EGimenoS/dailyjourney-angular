import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { authEndpoint } from '../../../../config';
import { ApiResponse } from '../interfaces/api-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from './auth.service';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private errorsService: ErrorsService
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
        tap(() => this.dialog.closeAll()),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Registro de usuario');
          return of(null);
        })
      );
  }
}
