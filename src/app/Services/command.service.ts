import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../Classes/command';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private baseURL = 'http://localhost:8000/commands';

  constructor(private httpClient: HttpClient) {}

  getAllCommands(): Observable<Command[]> {
    return this.httpClient.get<Command[]>(`${this.baseURL}`);
  }

  createCommand(command: Command): Observable<Command> {
    return this.httpClient.post<Command>(`${this.baseURL}`, command);
  }

  deleteCommand(commandId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${commandId}`);
  }

  getCommandById(commandId: number): Observable<Command> {
    return this.httpClient.get<Command>(`${this.baseURL}/${commandId}`);
  }
}
