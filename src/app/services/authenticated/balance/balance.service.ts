import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseHttpServiceAuthenticated } from '../base-http-authenticated';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BalanceService extends BaseHttpServiceAuthenticated {
  constructor(protected override http: HttpClient, protected override cookieService: CookieService) {
    super(http, cookieService);
  }

  getBalance(email: string): Observable<number> {
    const path = `/balance/${email}`;
    return this.get<number>(path);
  }
}