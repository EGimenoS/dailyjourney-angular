import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../../config';
import { Observable, of } from 'rxjs';
import { TravelPayload } from '../interfaces/travel-payload';
import { ApiResponse } from '../interfaces/api-response';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Travel } from '../interfaces/travel';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  url = `${endpoint}/travels`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient, private router: Router, private uiService: UiService) {}

  createNewTravel(payload: TravelPayload): Observable<any> {
    return this.http
      .post<ApiResponse>(this.url, payload, {
        headers: this.headers,
      })
      .pipe(
        tap(() => this.router.navigateByUrl('home')),
        tap(() => {
          this.uiService.openSnackBar({
            message: 'Viaje creado con éxito! 🚗',
            class: 'accent',
          });
        })
      );
  }

  getTravelsNearOfDestination(lat, long): Observable<Travel[]> {
    return this.http.get<Travel[]>(this.url, {
      params: { destination_latitude: lat, destination_longitude: long },
    });
  }

  // returns an array of a single travel to make easier the map component to reuse.
  getTravelDetail(id: string): Observable<Travel[]> {
    return this.http.get<Travel>(`${this.url}/${id}`).pipe(map((result) => [result]));
  }
}
