import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../../config';
import { Observable, of } from 'rxjs';
import { TravelPayload } from '../interfaces/travel-payload';
import { ApiResponse } from '../interfaces/api-response';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  url = `${endpoint}/travels`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient, private router: Router) {}

  createNewTravel(payload: TravelPayload): Observable<any> {
    return this.http
      .post<ApiResponse>(this.url, payload, {
        headers: this.headers,
      })
      .pipe(tap(() => this.router.navigateByUrl('home')));
  }
}
