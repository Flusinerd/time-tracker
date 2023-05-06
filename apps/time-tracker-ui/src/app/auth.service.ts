import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  public refreshToken() {
    return this.http.post<User>('/api/auth/refresh', {});
  }

  public logout() {
    return this.http.post('/api/auth/logout', {});
  }
}
