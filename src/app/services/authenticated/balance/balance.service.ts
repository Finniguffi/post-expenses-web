import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private apiUrl = BACKEND_URL;

  constructor(private http: HttpClient) {}

  getBalance(email: string): Observable<number> {
    const url = `${this.apiUrl}/balance/${email}`;
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<number>(url, { headers: httpHeaders });
  }
}