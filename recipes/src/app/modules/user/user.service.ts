import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addUserToServer(user: User){
    return this.http.post<User>(this.API_URL, user);
  }
  private userName: string = '';
  constructor(private http: HttpClient) { }

  private readonly API_URL = 'http://localhost:5113/User';
  
  getUsersFromServer(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  userExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/${username}`);
  }

  checkPassword(username: string, password: string): Observable<boolean> {
    const body = { username, password }; // Create an object with username and password properties
    return this.http.post<boolean>(`${this.API_URL}`, body);
  }
  getUserByName(name: string) : Observable<User>{
    return this.http.get<User>(`${this.API_URL}/${name}`);
  }
  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }
}
