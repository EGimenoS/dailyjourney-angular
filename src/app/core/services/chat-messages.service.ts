import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from 'config';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatMessage } from '../interfaces/chat-message';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  url = `${endpoint}/chat_messages`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient, private errorsService: ErrorsService) {}

  public getChatMessagesByTravel(travelID: string): Observable<ChatMessage[]> {
    return this.http
      .get<ChatMessage[]>(this.url, {
        params: { travel_id: travelID },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Obteniendo mensajes de chat');
          return of(null);
        })
      );
  }

  public createNewChatMessage(travelID: string, message: string): Observable<ChatMessage> {
    return this.http
      .post<ChatMessage>(
        this.url,
        { travel_id: travelID, message },
        {
          headers: this.headers,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorsService.handleError(error, 'Creando mensaje');
          return of(null);
        })
      );
  }
}
