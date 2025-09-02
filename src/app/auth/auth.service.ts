import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.updateLoginStatus();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/api/token/`, { username, password }).pipe(
      tap(res => {
        sessionStorage.setItem('access_token', res.access);
        sessionStorage.setItem('refresh_token', res.refresh);
        sessionStorage.setItem('username', username);
        this.loggedIn.next(true);
      })
    );
  }

  register(payload: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/register/`, payload);
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('username');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  updateLoginStatus() {
    const hasToken = this.hasValidToken();
    this.loggedIn.next(hasToken);
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
