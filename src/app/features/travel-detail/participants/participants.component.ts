import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Participant } from 'src/app/core/interfaces/participant';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent implements OnInit, OnChanges {
  @Input() participants: Participant[];
  participantsToApprove: Participant[];
  participantsRejected: Participant[];
  participantsApproved: Participant[];

  participantStatusTranslation = {
    approved: { label: 'aprobado', class: 'status-approved' },
    pending_approval: { label: 'pendiente', class: 'status-pending' },
    rejected: { label: 'rechazado', class: 'status-rejected' },
  };
  @Output() fetchDataFromServer = new EventEmitter();
  constructor(private participantsService: ParticipantsService) {}

  ngOnInit(): void {
    this.setParticipantsStatus();
  }
  ngOnChanges(): void {
    this.setParticipantsStatus();
  }

  approveParticipant(participantID: number): void {
    this.participantsService
      .updateParticipantStatus(participantID, 1)
      .subscribe(() => this.fetchDataFromServer.emit());
  }

  rejectParticipant(participantID: number): void {
    this.participantsService
      .updateParticipantStatus(participantID, 2)
      .subscribe(() => this.fetchDataFromServer.emit());
  }

  private setParticipantsStatus(): void {
    this.participantsApproved = this.participants.filter(
      (participant) => participant.status === 'approved'
    );
    this.participantsToApprove = this.participants.filter(
      (participant) => participant.status === 'pending_approval'
    );
  }
}
