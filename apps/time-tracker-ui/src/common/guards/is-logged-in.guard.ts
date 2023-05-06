import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, tap } from 'rxjs';
import * as fromAuth from '../../store/auth/auth.selectors';

export function isLoggedInGuard(): Observable<boolean> {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(fromAuth.selectIsLoggedIn).pipe(
    filter((isLoggedIn): isLoggedIn is boolean => isLoggedIn !== null),
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  );
}
