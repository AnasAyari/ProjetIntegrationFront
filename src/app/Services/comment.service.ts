import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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
  
  getCommentsByPostId(postId: number): Observable<Comment[] | null> {
    let params = new HttpParams().set('postId', postId.toString());
    return this.httpClient
      .get<Comment[]>(`${this.baseURL}`, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of(null);
          }
          return throwError(error);
        })
      );
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.baseURL}`, comment);
  }
}
