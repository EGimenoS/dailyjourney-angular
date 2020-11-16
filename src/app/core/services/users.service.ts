import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { authEndpoint } from '../../../../config';
import { UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  createNewUser(credentials: UserCredentials): Observable<any> {
    return this.http
      .post<UserCredentials>(`${authEndpoint}/sign_up`, credentials, {
        headers: this.headers,
      })
      .pipe(tap((res) => alert(res.message)));
  }
}
