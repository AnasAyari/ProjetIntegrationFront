import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../Classes/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseURL = 'http://127.0.0.1:8000/api/messages';

  constructor(private httpClient: HttpClient) {}

  getAllMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.baseURL}`);
  }

  getMessageById(messageId: number): Observable<Message> {
    return this.httpClient.get<Message>(`${this.baseURL}/${messageId}`);
  }
}
