import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TravelsService } from './travels.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private authService: AuthService, private travelsService: TravelsService) {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.travelsService.setTravelsForCurrentUser();
      }
    });
  }
}
