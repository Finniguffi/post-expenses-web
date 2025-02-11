import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BalanceService } from './balance.service';
import { CookieService } from 'ngx-cookie-service';
import { EMAIL_KEY } from '../../../utils/cookies';
import { ERROR_MESSAGES, INFO_MESSAGES, SCREENS } from '../../../utils/constants';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceContextService {
  private balanceSubject = new BehaviorSubject<number | null>(null);
  balance$: Observable<number | null> = this.balanceSubject.asObservable();

  constructor(
    private balanceService: BalanceService,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService
  ) {
    const email = this.getEmailFromCookies();
    if (email) {
      this.fetchBalance(email).subscribe({
        next: (balance) => {
          this.balanceSubject.next(balance);
        },
        error: (err) => {
          this.toastService.show('Failed to fetch balance');
          console.error('Failed to fetch balance:', err);
        },
      });
    } else {
      this.navigateToLogin();
      this.toastService.show(INFO_MESSAGES.SESSION_EXPIRED);
    }
  }

  private navigateToLogin = () => {
    this.router.navigate([`/${SCREENS.LOGIN}`]);
  };

  private getEmailFromCookies(): string | null {
    return this.cookieService.get(EMAIL_KEY) || null;
  }

  private fetchBalance(email: string): Observable<number> {
    return this.balanceService.getBalance(email).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    this.toastService.show('Something went wrong; please try again later.');
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}