import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '../../base-http.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceService extends BaseHttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getBalance(email: string): Observable<number> {
    const path = `/balance/${email}`;
    return this.get<number>(path);
  }
}