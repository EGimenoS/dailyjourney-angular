import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AutocompleteAddress } from '../interfaces/autocomplete-address';
import { endpoint } from '../../../../config';
import { catchError } from 'rxjs/operators';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteAddresesService {
  url = `${endpoint}/search_addresses`;
  defaultAt = '39.48728,-0.36593';
  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  getValidAddreses(query: string, at: string = this.defaultAt): Observable<AutocompleteAddress[]> {
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
