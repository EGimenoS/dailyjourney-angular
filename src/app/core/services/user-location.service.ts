import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeoPosition } from '../interfaces/travel-payload';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private userOriginSubject: BehaviorSubject<GeoPosition>;
  public userOrigin: Observable<GeoPosition>;
  private userDestinationSubject: BehaviorSubject<GeoPosition>;
  public userDestination: Observable<GeoPosition>;

  public deviceLocation: Observable<any>;

  constructor() {
    this.checkDeviceLocation();
    this.userOriginSubject = new BehaviorSubject<GeoPosition>(null);
    this.userOrigin = this.userOriginSubject.asObservable();
    this.userDestinationSubject = new BehaviorSubject<GeoPosition>(null);
    this.userDestination = this.userDestinationSubject.asObservable();
  }

  public setUserOrigin(position: GeoPosition): void {
    this.userOriginSubject.next(position);
  }

  public setUserDestination(position: GeoPosition): void {
    this.userDestinationSubject.next(position);
  }

  private checkDeviceLocation(): void {
    if ('geolocation' in navigator) {
      this.deviceLocation = this.getPosition();
    } else {
      this.deviceLocation = null;
    }
  }

  private getPosition(): Observable<any> {
    return new Observable((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }
}
