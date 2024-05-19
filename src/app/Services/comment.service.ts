import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../Classes/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseURL = 'http://localhost:8000/comment'; // replace with your actual API URL

  constructor(private httpClient: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.baseURL}/comments`);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseURL}/new`, comment);
  }
}
