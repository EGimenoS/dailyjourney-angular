import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss'],
})
export class TravelInfoComponent implements OnInit {
  currentUser: UserSession;
  @Input() travels$: Observable<Travel[]>;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;

  travel$: Observable<Travel>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.travel$ = this.travels$.pipe(map((travel) => travel[0]));
  }

  checkIfOwner(ownerID: number): boolean {
    console.log('owner', ownerID);
    console.log('currentUser', JSON.stringify(this.currentUser, null, 2));
    return this.currentUser.id === ownerID ? true : false;
  }
}
