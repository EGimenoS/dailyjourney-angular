import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatMessage } from 'src/app/core/interfaces/chat-message';
import { ChatMessagesService } from 'src/app/core/services/chat-messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnChanges, AfterViewChecked {
  @Input() travelID: string;
  @ViewChildren('chatContainer') chatContainer: QueryList<ElementRef>;
  messages$: Observable<ChatMessage[]>;
  constructor(private chatMessagesService: ChatMessagesService) {}

  onEnterAddMessage(message, input): void {
    this.chatMessagesService
      .createNewChatMessage(this.travelID, message)
      .pipe(
        tap(
          () => (this.messages$ = this.chatMessagesService.getChatMessagesByTravel(this.travelID))
        )
      )
      .subscribe(() => (input.value = ''));
  }

  ngOnChanges(): void {
    this.messages$ = this.chatMessagesService.getChatMessagesByTravel(this.travelID);
  }

  ngAfterViewChecked(): void {
    this.chatContainer.changes.subscribe((el: QueryList<ElementRef>) => {
      if (el.first) {
        el.first.nativeElement.scrollTop = el.first.nativeElement.scrollHeight;
      }
    });
  }
}
