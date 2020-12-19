import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TravelDetailRoutingModule } from './travel-detail-routing.module';
import { TravelDetailComponent } from './travel-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import { ChatComponent } from './chat/chat.component';
import { ParticipantsComponent } from './participants/participants.component';

@NgModule({
  declarations: [TravelDetailComponent, TravelInfoComponent, ChatComponent, ParticipantsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TravelDetailRoutingModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class TravelDetailModule {}
