import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../../../config';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TravelPayload } from '../interfaces/travel-payload';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Travel } from '../interfaces/travel';
import { UiService } from './ui.service';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class TravelsService {
  url = `${endpoint}/travels`;
  profileUrl = `${endpoint}/profile_travels`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  currentUserTravels: BehaviorSubject<Travel[]>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService,
    private errorsService: ErrorsService
  ) {
    this.currentUserTravels = new BehaviorSubject<Travel[]>(null);
    this.setTravelsForCurrentUser();
  }

  createNewTravel(payload: TravelPayload): Observable<Travel> | Observable<null> {
    return this.http
      .post<any>(this.url, payload, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => this.setTravelsForCurrentUser()),
        tap((res) => this.router.navigateByUrl(`/travel-detail/${res.id}`)),
        tap(() => {
          this.uiService.openSnackBar({
            message: 'Viaje creado con éxito! 🚗',
            class: 'accent',
          });
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Creación de viaje');
          return of(null);
        })
      );
  }

  deleteTravel(travelID): Observable<null> {
    return this.http.delete<any>(`${this.url}/${travelID}`).pipe(
      tap((res) => this.setTravelsForCurrentUser()),
      tap((res) => this.router.navigateByUrl('home')),
      tap(() => {
        this.uiService.openSnackBar({
          message: 'Viaje eliminado con éxito',
          class: 'accent',
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorsService.handleError(error, 'Borrar viaje');
        return of(null);
      })
    );
  }

  getTravelsNearOfDestination(lat, long): Observable<Travel[]> | Observable<null> {
    return this.http
      .get<Travel[]>(this.url, {
        params: { destination_latitude: lat, destination_longitude: long },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Recuperando información de viaje');
          return of(null);
        })
      );
  }

  // returns an array of a single travel to make easier the map component to reuse.
  getTravelDetail(id: string): Observable<Travel[]> | Observable<null> {
    return this.http.get<Travel>(`${this.url}/${id}`).pipe(
      map((result) => [result]),
      catchError((error: HttpErrorResponse) => {
        this.errorsService.handleError(error, 'Obteniendo viajes');
        return of(null);
      })
    );
  }

  setTravelsForCurrentUser(): void {
    this.getTravelsByUser().subscribe((travels) => this.currentUserTravels.next(travels));
  }

  private getTravelsByUser(): Observable<Travel[]> | Observable<null> {
    return this.http.get<Travel>(this.profileUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorsService.handleError(error, 'Obteniendo viajes');
        return of(null);
      })
    );
  }
}
