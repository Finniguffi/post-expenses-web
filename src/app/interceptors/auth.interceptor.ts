import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMAIL_KEY, TOKEN_KEY } from '../utils/cookies';
import { SCREENS } from '../utils/constants';

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    console.log('Auth interceptor called'); // Debugging log
    const cookieService = inject(CookieService);
    const router = inject(Router);
    const token = cookieService.get(TOKEN_KEY);
    const email = cookieService.get(EMAIL_KEY);

    const deleteCookie = (key: string) => {
        cookieService.delete(key);
    };

    const navigateToLogin = () => {
        router.navigate([`/${SCREENS.LOGIN}`]);
    };

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', token)
        });
        return next(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    deleteCookie(TOKEN_KEY);
                    deleteCookie(EMAIL_KEY);
                    navigateToLogin();
                }
                return throwError(() => new Error(error.message));
            })
        );
    } else {
        return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (email) {
                        deleteCookie(EMAIL_KEY);
                    }
                    navigateToLogin();
                }
                return throwError(() => new Error(error.message));
            })
        );
    }
}