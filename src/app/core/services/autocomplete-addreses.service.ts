import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutocompleteAddress } from '../interfaces/autocomplete-address';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteAddresesService {
  url = 'http://localhost:3000/api/v1/search_addresses';
  defaultAt = '39.48728,-0.36593';
  constructor(private http: HttpClient) {}

  getValidAddreses(query: string, at: string = this.defaultAt): Observable<AutocompleteAddress[]> {
    return this.http.get<AutocompleteAddress[]>(this.url, { params: { q: query, at } });
  }
}
