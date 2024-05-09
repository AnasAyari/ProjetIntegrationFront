import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poster } from '../Classes/poster';

@Injectable({
  providedIn: 'root',
})
export class PosterService {
  private baseURL = 'http://127.0.0.1:8000/api/posters';

  constructor(private httpClient: HttpClient) {}

  getAllPosters(): Observable<Poster[]> {
    return this.httpClient.get<Poster[]>(`${this.baseURL}`);
  }

  getPosterById(posterId: number): Observable<Poster> {
    return this.httpClient.get<Poster>(`${this.baseURL}/${posterId}`);
  }
}
