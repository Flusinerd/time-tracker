import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../app/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  $refershToken = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((user) =>
            AuthActions.loginUser({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              picture: user.profile_picture,
            })
          ),
          catchError(() => of(AuthActions.logoutUser()))
        )
      )
    )
  );

  $logOut = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutUser),
        switchMap(() => {
          this.authService.logout();
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
