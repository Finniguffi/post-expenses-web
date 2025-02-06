import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(credentials: LoginRequest): Observable<string> {
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/auth/login`, credentials, { headers: httpHeaders, responseType: 'text' });
  }
}