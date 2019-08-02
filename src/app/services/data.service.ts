import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../app.interfaces';
import { map, tap } from 'rxjs/internal/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class DataService {

  private serverAddress = 'http://localhost:3000';
  private authorizedSubject = new ReplaySubject<boolean>(1);
  private userLogin: string;
  private authenticated = false;

  constructor(private http: HttpClient) {
  }

  public authorized$(): Observable<boolean> {
    return this.authorizedSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getCurrentUser(): Observable<User> {
    return this.getUser(this.userLogin);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverAddress}/users`);
  }

  public getUser(login: string): Observable<User> {
    return this.http.get<User>(`${this.serverAddress}/users/${login}`);
  }

  public authorize(user: User): Observable<boolean> {
    this.userLogin = user.login;
    return this.http.post(`${this.serverAddress}/login`, user)
      .pipe(
        map((response: any) => response.authorized),
        tap(allowed => {
          this.authenticated = allowed;
          this.authorizedSubject.next(allowed);
        })
      );
  }

  public addUser(user: User): Observable<any> {
    return this.http.post(`${this.serverAddress}/users`, user);
  }

  public editUser(user: User): Observable<any> {
    return this.http.put(`${this.serverAddress}/users/${user.login}`, user);
  }

  public deleteUser(login: string): Observable<any> {
    return this.http.delete(`${this.serverAddress}/users/${login}`);
  }
}
