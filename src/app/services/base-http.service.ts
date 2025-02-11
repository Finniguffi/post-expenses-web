import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BACKEND_URL } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  protected apiUrl = BACKEND_URL;

  constructor(protected http: HttpClient) {}

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  protected getDefaultHeaders(headers: { [key: string]: string } = {}): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers,
    });
  }

  protected get<T>(path: string, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.get<T>(`${this.apiUrl}${path}`, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected post<T>(path: string, body: unknown, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.post<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected put<T>(path: string, body: unknown, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.put<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  protected delete<T>(path: string, options: { headers?: { [key: string]: string }, responseType?: 'json' | 'text' } = {}): Observable<T> {
    const httpHeaders = this.getDefaultHeaders(options.headers || {});
    return this.http.delete<T>(`${this.apiUrl}${path}`, { headers: httpHeaders, responseType: options.responseType as 'json' }).pipe(
      catchError(this.handleError)
    );
  }
}