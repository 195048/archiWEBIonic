import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://139.59.136.122:8443/api/users/login'; 
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  saveInfos(token: string,email: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('jwt_token', token);
    this.authStatus.next(true);
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('jwt_token');
    this.authStatus.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  register(user: {email: string, password: string, address: string}): Observable<any> {
    const registerUrl = 'http://139.59.136.122:8000/api/users/register';  // Replace with your register API endpoint
    return this.http.post<any>(registerUrl, user);
  }
  
}
