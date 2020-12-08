import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserSession } from '../interfaces/user-session';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { authEndpoint } from 'config';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserSession>;
  public currentUser: Observable<UserSession>;
  private headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private dialog: MatDialog,
    private errorsService: ErrorsService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserSession>(this.initializeUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private initializeUser(): UserSession {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null;
  }

  public isAuthenticated(): boolean {
    return this.currentUserSubject.value ? true : false;
  }

  public login(credentials: UserCredentials): Observable<HttpResponse<ApiResponse>> | null {
    const { email, password } = credentials;
    return this.http
      .post<ApiResponse>(
        `${authEndpoint}/sign_in`,
        { email, password },
        { headers: this.headers, observe: 'response' as const }
      )
      .pipe(
        tap((response) => {
          const token = response.headers.get('Access-Token');
          this.setUser(token);
          this.dialog.closeAll();
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'login');
          return of(null);
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  public setUser(token): void {
    const userObject = this.buildUserFromToken(token);
    localStorage.setItem('currentUser', JSON.stringify(userObject));
    this.currentUserSubject.next(userObject);
  }

  private buildUserFromToken(token): UserSession {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return {
      id: decodedToken.id,
      token,
      name: decodedToken.name,
    };
  }
}
