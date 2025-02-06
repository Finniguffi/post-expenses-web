import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BalanceService } from './balance.service';
import { CookieService } from 'ngx-cookie-service';
import { EMAIL_KEY } from '../../../utils/cookies';

@Injectable({
  providedIn: 'root',
})
export class BalanceContextService {
  private balanceSubject = new BehaviorSubject<number | null>(null);
  balance$: Observable<number | null> = this.balanceSubject.asObservable();

  constructor(private balanceService: BalanceService, private cookieService: CookieService) {
    const email = this.getEmailFromCookies();
    if (email) {
      this.fetchBalance(email).subscribe({
        next: (balance) => this.balanceSubject.next(balance),
        error: (err) => console.error('Failed to fetch balance:', err),
      });
    }
  }

  private getEmailFromCookies(): string | null {
    return this.cookieService.get(EMAIL_KEY) || null;
  }

  private fetchBalance(email: string): Observable<number> {
    return this.balanceService.getBalance(email).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}