import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ReplaySubject, filter, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import * as fromAuth from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private store = inject(Store);
  public initDone$ = new ReplaySubject<void>(1);
  public socket!: Socket;

  constructor() {
    this.store
      .select(fromAuth.selectIsLoggedIn)
      .pipe(
        filter((isLoggedIn) => !!isLoggedIn),
        tap(() => this.connect()),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private connect() {
    this.socket = io('http://localhost:4200', {
      path: '/api/socket.io',
    });

    this.socket.on('connect', () => {
      this.initDone$.next();
      this.initDone$.complete();
    });
  }
}
