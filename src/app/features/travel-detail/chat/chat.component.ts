import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/core/interfaces/chat-message';
import { ChatMessagesService } from 'src/app/core/services/chat-messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges {
  @Input() travelID: string;
  messages$: Observable<ChatMessage[]>;
  constructor(private chatMessagesService: ChatMessagesService) {}

  onEnterAddMessage(message, input): void {
    this.chatMessagesService.createNewChatMessage(this.travelID, message).subscribe();
    input.value = '';
  }

  ngOnChanges(): void {
    this.messages$ = this.chatMessagesService.getChatMessagesByTravel(this.travelID);
  }
}
