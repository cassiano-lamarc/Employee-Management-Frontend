import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(token: string): void {
    localStorage.setItem('access_token', token);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
