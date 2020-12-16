import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Participant } from 'src/app/core/interfaces/participant';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParticipantsService } from 'src/app/core/services/participants.service';
import { UserLocationService } from 'src/app/core/services/user-location.service';
import { calculateDistance } from 'src/app/shared/utilities/calculate-distance';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss'],
})
export class TravelInfoComponent implements OnInit, OnChanges {
  currentUser: UserSession;
  userOrigin: GeoPosition;
  userDestination: GeoPosition;
  @Input() travels$: Observable<Travel[]>;
  @Output() fetchDataFromServer = new EventEmitter();

  statusTranslations = {
    approved: 'Registrado al viaje',
    pending_approval: 'Pendiente de aprobación del conductor',
    rejected: 'Solicitud no aprobada por el conductor',
  };

  change: boolean;

  travel$: Observable<Travel>;
  constructor(
    private authService: AuthService,
    private participantsService: ParticipantsService,
    private userLocationService: UserLocationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
    this.userLocationService.userOrigin.subscribe((location) => (this.userOrigin = location));
    this.userLocationService.userDestination.subscribe(
      (location) => (this.userDestination = location)
    );
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

  userTravelStatus(participants: Participant[]): string {
    return participants.find((participant) => participant.user_id === this.currentUser?.id)?.status;
  }

  isOwner(ownerID: number): boolean {
    return this.currentUser?.id === ownerID ? true : false;
  }

  calculateDistance(userPoint, travelPoint): number {
    return calculateDistance(userPoint, travelPoint);
  }

  getApprovedParticipants(participants: Participant[]): number {
    return participants.filter((participant) => participant.status === 'approved').length;
  }
}
