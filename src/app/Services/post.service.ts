import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Classes/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseURL = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseURL}/post/posts`);
  }

  getPostById(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseURL}/${postId}`);
  }

  createPost(post:Post): Observable<Post>{
    return this.httpClient.post<Post>(`${this.baseURL}/post/new`, post);
  }
}
