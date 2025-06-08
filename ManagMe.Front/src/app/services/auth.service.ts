import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly accessTokenKey = 'token';
  private readonly refreshTokenKey = 'refreshToken';

  constructor(private readonly http: HttpClient) {}

  login(login: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { login, password })
      .pipe(
        tap((res) => {
          this.setTokens(res.token, res.refreshToken);
        }),
      );
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return of(null);

    return this.http
      .post<any>(`${this.apiUrl}/refreshToken`, { refreshToken })
      .pipe(
        tap((res) => {
          this.setTokens(res.token, res.refreshToken);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  private setTokens(token: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }
}
