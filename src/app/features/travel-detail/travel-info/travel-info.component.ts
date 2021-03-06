import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationComponent } from 'src/app/core/components/confirmation/confirmation.component';
import { Participant } from 'src/app/core/interfaces/participant';
import { Travel } from 'src/app/core/interfaces/travel';
import { GeoPosition } from 'src/app/core/interfaces/travel-payload';
import { UserSession } from 'src/app/core/interfaces/user-session';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParticipantsService } from 'src/app/core/services/participants.service';
import { TravelsService } from 'src/app/core/services/travels.service';
import { UserLocationService } from 'src/app/core/services/user-location.service';
import { calculateDistance } from 'src/app/shared/utilities/calculate-distance';

@Component({
  selector: 'app-travel-info',
  templateUrl: './travel-info.component.html',
  styleUrls: ['./travel-info.component.scss'],
})
export class TravelInfoComponent implements OnChanges {
  currentUser: UserSession;
  userOrigin: GeoPosition;
  userDestination: GeoPosition;
  isCurrentUserOwner: boolean;
  @Input() travel: Travel;
  @Output() fetchDataFromServer = new EventEmitter();

  statusTranslations = {
    approved: 'Registrado al viaje',
    pending_approval: 'Pendiente de aprobación del conductor',
    rejected: 'Solicitud no aprobada por el conductor',
  };

  change: boolean;

  constructor(
    private authService: AuthService,
    private participantsService: ParticipantsService,
    private userLocationService: UserLocationService,
    private travelsService: TravelsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openConfirmDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '350px',
      data: '¿Estás seguro de que quieres borrar este registro?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handleDeleteTravel(id);
      }
    });
  }

  ngOnChanges(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      this.isCurrentUserOwner = this.isOwner(this.travel.owner.id);
    });
    this.userLocationService.userOrigin.subscribe((location) => (this.userOrigin = location));
    this.userLocationService.userDestination.subscribe(
      (location) => (this.userDestination = location)
    );
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

  showChat(): boolean {
    return (
      this.isCurrentUserOwner || this.userTravelStatus(this.travel.participants) === 'approved'
    );
  }

  calculateDistance(userPoint, travelPoint): number {
    return calculateDistance(userPoint, travelPoint);
  }

  getNumberOfApprovedParticipants(participants: Participant[]): number {
    return participants.filter((participant) => participant.status === 'approved').length;
  }

  handleDeleteTravel(travelID: number): void {
    this.travelsService.deleteTravel(travelID).subscribe();
  }

  handleEditTravel(travelID: number): void {
    this.router.navigateByUrl(`/update-travel/${travelID}`);
  }
}
