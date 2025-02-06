import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TOKEN_KEY } from '../../utils/cookies';
import { CookieService } from 'ngx-cookie-service';
import { BACKEND_URL } from '../../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpServiceAuthenticated {
  protected apiUrl = BACKEND_URL;

  constructor(protected http: HttpClient, private cookieService: CookieService) {}

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  private getAuthHeaders(headers: { [key: string]: string } = {}): HttpHeaders {
    const token = this.cookieService.get(TOKEN_KEY);
    return new HttpHeaders({
      ...headers,
      Authorization: `${token}`,
    });
  }

  protected get<T>(path: string, headers: { [key: string]: string } = {}): Observable<T> {
    const httpHeaders = this.getAuthHeaders(headers);
    return this.http.get<T>(`${this.apiUrl}${path}`, { headers: httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  protected post<T>(path: string, body: unknown, headers: { [key: string]: string } = {}): Observable<T> {
    const httpHeaders = this.getAuthHeaders(headers);
    return this.http.post<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  protected put<T>(path: string, body: unknown, headers: { [key: string]: string } = {}): Observable<T> {
    const httpHeaders = this.getAuthHeaders(headers);
    return this.http.put<T>(`${this.apiUrl}${path}`, body, { headers: httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  protected delete<T>(path: string, headers: { [key: string]: string } = {}): Observable<T> {
    const httpHeaders = this.getAuthHeaders(headers);
    return this.http.delete<T>(`${this.apiUrl}${path}`, { headers: httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }
}