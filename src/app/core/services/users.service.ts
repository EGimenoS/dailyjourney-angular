import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { authEndpoint } from '../../../../config';
import { UserCredentials } from '../interfaces/user-credentials';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });

  createNewUser(credentials: UserCredentials): Observable<any> {
    return this.http
      .post<UserCredentials>(`${authEndpoint}/sign_up`, credentials, {
        headers: this.headers,
      })
      .pipe(tap(() => this.dialog.closeAll()));
  }
}
