import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap } from 'rxjs';
import { AuthService } from '../../app/auth.service';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone = req.clone({
      withCredentials: true,
    });

    return next.handle(clone).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.handle401Error(req, next, error);
        }
        throw error;
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: unknown
  ) {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        return next.handle(req);
      }),
      catchError((error) => {
        this.store.dispatch(AuthActions.logoutUser());

        this.router.navigate(['/login']);
        throw originalError;
      })
    );
  }
}
