import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TOKEN_KEY } from '../../utils/cookies';
import { CookieService } from 'ngx-cookie-service';
import { BACKEND_URL } from '../../utils/environment';
import { BaseHttpService } from '../base-http.service';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpServiceAuthenticated extends BaseHttpService {
  constructor(protected override http: HttpClient, protected cookieService: CookieService) {
    super(http);
  }

  protected override getDefaultHeaders(headers: { [key: string]: string } = {}): HttpHeaders {
    const token = this.cookieService.get(TOKEN_KEY);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
      ...headers,
    });
  }

  protected override get<T>(path: string, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.get<T>(`${this.apiUrl}${path}`, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected override post<T>(path: string, body: unknown, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.post<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected override put<T>(path: string, body: unknown, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.put<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected override delete<T>(path: string, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.delete<T>(`${this.apiUrl}${path}`, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }
}