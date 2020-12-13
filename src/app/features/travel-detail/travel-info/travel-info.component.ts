import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Participant } from 'src/app/core/interfaces/participant';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss'],
})
export class TravelInfoComponent implements OnInit, OnChanges {
  currentUser: UserSession;
  @Input() travels$: Observable<Travel[]>;
  @Input() userOrigin: GeoPosition;
  @Input() userDestination: GeoPosition;
  @Output() fetchDataFromServer = new EventEmitter();

  change: boolean;

  travel$: Observable<Travel>;
  constructor(private authService: AuthService, private participantsService: ParticipantsService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.travel$ = this.travels$.pipe(map((travel) => travel[0]));
  }

  ngOnChanges(): void {
    this.travel$ = this.travels$.pipe(map((travel) => travel[0]));
  }

  onRegisterToTravelClick(travelId: number): void {
    this.participantsService
      .createNewParticipant(travelId)
      .subscribe(() => this.fetchDataFromServer.emit());
  }

  onDeleteRegisterFromTravelClick(travel: Travel): void {
    const participantID = travel.participants.find(
      (participant) => this.currentUser.id === participant.user_id
    ).id;
    this.participantsService
      .deleteParticipant(participantID)
      .subscribe(() => this.fetchDataFromServer.emit());
  }

  isUserRegisteredToTravel(participants: Participant[]): boolean {
    return participants.some((participant) => participant.user_id === this.currentUser.id);
  }

  isOwner(ownerID: number): boolean {
    return this.currentUser.id === ownerID ? true : false;
  }
}
