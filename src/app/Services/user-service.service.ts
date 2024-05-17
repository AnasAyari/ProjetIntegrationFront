import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseURL="http://localhost:8000/users"

  constructor(private httpClient:HttpClient) { }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }
  
  getUserById(userID:number):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${userID}`);
  }
  
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/email/${email}`);
  }

  createUser(user:User):Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}/new`,user);
  }

  updateUser(userID:number,user:User):Observable<User>{
    return this.httpClient.put<User>(`${this.baseURL}/${userID}/edit`,user);
  }

  deleteUserById(userID:number):Observable<User>{
    return this.httpClient.delete<User>(`${this.baseURL}/${userID}`);
  }
}
