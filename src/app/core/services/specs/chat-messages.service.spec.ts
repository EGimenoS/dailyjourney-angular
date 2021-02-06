import { TestBed } from '@angular/core/testing';
import { ChatMessagesService } from '../chat-messages.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ErrorsService } from '../errors.service';
import { ChatMessage } from '../../interfaces/chat-message';
import { endpoint } from 'config';
import { chatMessages } from 'src/app/mock-data/chat-messages.data';

describe('ChatMessagesService', () => {
  let chatMessagesService: ChatMessagesService;
  let httpTestingController: HttpTestingController;
  let errorsServiceSpy: jasmine.SpyObj<ErrorsService>;
  const url = `${endpoint}/chat_messages`;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ErrorsService', ['handleError']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatMessagesService, { provide: ErrorsService, useValue: spy }],
    });

    chatMessagesService = TestBed.inject(ChatMessagesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    errorsServiceSpy = TestBed.inject(ErrorsService) as jasmine.SpyObj<ErrorsService>;
  });

  it('should retrieve the list of chat messages given a travel ', () => {
    let messages: ChatMessage[];
    chatMessagesService.getChatMessagesByTravel('1').subscribe((resultMessages) => {
      messages = resultMessages;
      expect(messages.length).toBe(2);
    });
    const getRequest = httpTestingController.expectOne(`${url}?travel_id=1`);
    getRequest.flush(chatMessages);
  });
});
