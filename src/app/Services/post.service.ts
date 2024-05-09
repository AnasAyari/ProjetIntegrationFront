import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Classes/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseURL = 'http://127.0.0.1:8000/api/posts';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseURL}`);
  }

  getPostById(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseURL}/${postId}`);
  }
}
