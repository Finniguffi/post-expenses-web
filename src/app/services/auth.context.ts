import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthContextService {
  private authStateSubject = new BehaviorSubject<LoginResponse | null>(null);
  authState$: Observable<LoginResponse | null> = this.authStateSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    const token = this.getTokenFromCookies();
    if (token) {
      this.authStateSubject.next({ token });
      this.router.navigate(['/home']);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const token = this.getTokenFromCookies();
    if (token) {
      this.router.navigate(['/home']);
      return of({ token });
    }

    return new Observable<LoginResponse>((observer) => {
      this.authService.login(credentials).subscribe({
        next: (response) => {
          const loginResponse: LoginResponse = { token: response };
          this.authStateSubject.next(loginResponse);
          this.setTokenInCookies(response);
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
    this.router.navigate(['/login']);
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
    this.cookieService.set(this.TOKEN_KEY, token, expires);
  }

  private getTokenFromCookies(): string | null {
    return this.cookieService.get(this.TOKEN_KEY) || null;
  }

  private clearTokenFromCookies(): void {
    this.cookieService.delete(this.TOKEN_KEY);
  }
}