import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from 'config';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { TravelsService } from './travels.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class ParticipantsService {
  url = `${endpoint}/participants`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    private uiService: UiService,
    private errorsService: ErrorsService,
    private travelsService: TravelsService
  ) {}

  createNewParticipant(travelID: number): Observable<any> {
    return this.http.post<any>(this.url, { travel_id: travelID }, { headers: this.headers }).pipe(
      tap((res) => this.travelsService.setTravelsForCurrentUser()),
      tap(() => {
        this.uiService.openSnackBar({
          message: 'Apuntado, esperando a confrmación del conductor ✨',
          class: 'success',
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorsService.handleError(error, 'Añadir Participante');
        return of(null);
      })
    );
  }

  updateParticipantStatus(participantID: number, status: number): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${participantID}`, { status }, { headers: this.headers })
      .pipe(
        tap((res) => this.travelsService.setTravelsForCurrentUser()),
        tap(() => {
          this.uiService.openSnackBar({
            message: 'Actualizado status del viajero con éxito 👍',
            class: 'success',
          });
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Actualizar status de participante');
          return of(null);
        })
      );
  }

  deleteParticipant(participantID): Observable<any> {
    return this.http.delete<any>(`${this.url}/${participantID}`).pipe(
      tap((res) => this.travelsService.setTravelsForCurrentUser()),
      tap(() => {
        this.uiService.openSnackBar({
          message: 'Desapuntado del viaje con éxito',
          class: 'accent',
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorsService.handleError(error, 'Desapuntarse del viaje');
        return of(null);
      })
    );
  }
}
