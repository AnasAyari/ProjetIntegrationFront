import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Classes/user';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private baseURL = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  getUserById(userID: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${userID}`);
  }

  getUserByEmail(email: string): Observable<User | null> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.get<User>(`${this.baseURL}/user`, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(error);
      })
    );
  }
  
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/user/new`, user);
  }

  updateUser(userID: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseURL}/${userID}/edit`, user);
  }

  deleteUserById(userID: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseURL}/${userID}`);
  }
}
