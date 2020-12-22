import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutocompleteAddress } from '../interfaces/autocomplete-address';
import { endpoint } from '../../../../config';
import { catchError } from 'rxjs/operators';
import { ErrorsService } from './errors.service';
import { UserLocationService } from './user-location.service';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteAddresesService {
  url = `${endpoint}/search_addresses`;
  defaultAt = '39.48728,-0.36593';
  position: any = null;
  constructor(
    private http: HttpClient,
    private errorsService: ErrorsService,
    private userLocationService: UserLocationService
  ) {
    this.userLocationService.deviceLocation.subscribe(
      (location) => (this.position = `${location.coords.latitude},${location.coords.longitude}`)
    );
  }

  getValidAddreses(query: string): Observable<AutocompleteAddress[]> {
    const at = this.position || this.defaultAt;
    console.log(at);
    return this.http
      .get<AutocompleteAddress[]>(this.url, { params: { q: query, at } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Obteniendo direcciones');
          return of(null);
        })
      );
  }
}
