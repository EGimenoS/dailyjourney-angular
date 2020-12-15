import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeoPosition } from '../interfaces/travel-payload';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private userLocationSubject: BehaviorSubject<GeoPosition>;

  constructor() {
    this.userLocationSubject = new BehaviorSubject<GeoPosition>(null);
  }

  public setUserLocation(position: GeoPosition): void {
    this.userLocationSubject.next(position);
  }
}
