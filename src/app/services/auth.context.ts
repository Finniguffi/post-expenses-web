import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../model/auth.model';
import { SCREENS } from '../utils/constants';
import { EMAIL_KEY, TOKEN_KEY } from '../utils/cookies';

@Injectable({
  providedIn: 'root',
})
export class AuthContextService {
  private authStateSubject = new BehaviorSubject<LoginResponse | null>(null);
  authState$: Observable<LoginResponse | null> = this.authStateSubject.asObservable();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    const token = this.getTokenFromCookies();
    if (token) {
      this.authStateSubject.next({ token });
      this.router.navigate([`/${SCREENS.HOME}`]);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const token = this.getTokenFromCookies();
    if (token) {
      this.router.navigate([`/${SCREENS.HOME}`]);
      return of({ token });
    }

    return new Observable<LoginResponse>((observer) => {
      this.authService.login(credentials).subscribe({
        next: (response) => {
          const loginResponse: LoginResponse = { token: response };
          this.authStateSubject.next(loginResponse);
          this.setTokenInCookies(response);
          this.setEmailInCookies(credentials.email);
          observer.next(loginResponse);
          observer.complete();
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  logout(): void {
    this.authStateSubject.next(null);
    this.clearTokenFromCookies();
    this.clearEmailFromCookies();
    this.router.navigate([`/${SCREENS.LOGIN}`]);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value !== null;
  }

  getToken(): string | null {
    return this.authStateSubject.value?.token || this.getTokenFromCookies();
  }

  private setTokenInCookies(token: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // Set cookie to expire in 1 day
    this.cookieService.set(TOKEN_KEY, token, expires);
  }

  private getTokenFromCookies(): string | null {
    return this.cookieService.get(TOKEN_KEY) || null;
  }

  private clearTokenFromCookies(): void {
    this.cookieService.delete(TOKEN_KEY);
  }

  private setEmailInCookies(email: string): void {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // Set cookie to expire in 1 day
    this.cookieService.set(EMAIL_KEY, email, expires);
  }

  private clearEmailFromCookies(): void {
    this.cookieService.delete(EMAIL_KEY);
  }
}