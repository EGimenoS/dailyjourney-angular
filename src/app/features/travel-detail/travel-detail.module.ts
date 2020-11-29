import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { TravelDetailRoutingModule } from './travel-detail-routing.module';
import { TravelDetailComponent } from './travel-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TravelInfoComponent } from './travel-info/travel-info.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [TravelDetailComponent, TravelInfoComponent, ChatComponent],
  imports: [CommonModule, SharedModule, TravelDetailRoutingModule, MatChipsModule],
  exports: [MatChipsModule],
})
export class TravelDetailModule {}
