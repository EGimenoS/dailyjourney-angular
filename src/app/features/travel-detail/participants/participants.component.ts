import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  constructor(private participantsService: ParticipantsService) {}

  ngOnInit(): void {
    this.setParticipantsStatus();
  }
  ngOnChanges(): void {
    this.setParticipantsStatus();
  }

  approveParticipant(participantID): void {
    this.participantsService.updateParticipantStatus(participantID, 1).subscribe();
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
