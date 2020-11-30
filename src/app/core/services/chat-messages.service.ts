import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from 'config';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { ChatMessage } from '../interfaces/chat-message';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  url = `${endpoint}/chat_messages`;
  headers = new HttpHeaders({
    'Content-type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  getChatMessagesByTravel(travelID: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.url, {
      params: { travel_id: travelID },
    });
  }

  createNewChatMessage(travelID: string, message: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.url,
      { travel_id: travelID, message },
      {
        headers: this.headers,
      }
    );
  }
}
