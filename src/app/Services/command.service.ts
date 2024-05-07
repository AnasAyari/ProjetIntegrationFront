import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../Classes/command';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private baseURL = 'http://127.0.0.1:8000/api/commands';

  constructor(private httpClient: HttpClient) {}

  getAllCommands(): Observable<Command[]> {
    return this.httpClient.get<Command[]>(`${this.baseURL}`);
  }

  getCommandById(commandId: number): Observable<Command> {
    return this.httpClient.get<Command>(`${this.baseURL}/${commandId}`);
  }
}
