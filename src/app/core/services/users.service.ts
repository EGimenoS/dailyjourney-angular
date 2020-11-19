import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { authEndpoint } from '../../../../config';
import { ApiResponse } from '../interfaces/api-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  createNewUser(credentials: UserCredentials): Observable<HttpResponse<ApiResponse>> {
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
        tap(() => this.dialog.closeAll())
      );
  }
}
