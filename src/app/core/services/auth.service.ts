import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSession } from '../interfaces/user-session';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { authEndpoint } from 'config';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';
import { UserCredentials } from '../interfaces/user-credentials';
import { MatDialog } from '@angular/material/dialog';

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
    private dialog: MatDialog
  ) {
    this.currentUserSubject = new BehaviorSubject<UserSession>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: UserCredentials): Observable<HttpResponse<ApiResponse>> {
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
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  public get currentUserValue(): UserSession {
    return this.currentUserSubject.value;
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
