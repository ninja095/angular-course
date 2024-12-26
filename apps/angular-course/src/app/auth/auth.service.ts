import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  baseUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  saveTokens(response: TokenResponse) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http
      .post<TokenResponse>(`${this.baseUrl}token`, formData)
      .pipe(tap((response) => this.saveTokens(response)));
  }

  refreshTokens() {
    return this.http
      .post<TokenResponse>(`${this.baseUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((response) => this.saveTokens(response)),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  public logout() {
    this.token = null;
    this.refreshToken = null;
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
