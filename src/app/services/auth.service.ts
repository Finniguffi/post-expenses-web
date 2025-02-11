import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  login(credentials: LoginRequest): Observable<string> {
    const path = '/auth/login';
    return this.post<string>(path, credentials, { responseType: 'text' });
  }
}