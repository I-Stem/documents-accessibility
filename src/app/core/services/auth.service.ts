import { Injectable } from '@angular/core';

import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LocalStorageService } from './local-storage.service';
import { AuthDetails } from '../../shared/entity/entity';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  private _tokens: any;

  constructor(private storageService: LocalStorageService, private userService: UserService, private http: HttpClient) {
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  verifyToken() {
    const tokens = this.getToken();
    let token = tokens._accessToken;
    return this.http.post<any>(`${environment.baseUrl}/auth/verify/`, { token });
  }

  refreshToken(): Observable<any> {
    const tokens = this.getToken();
    let token = tokens._refreshToken;
    return this.http.post<any>(`${environment.baseUrl}/auth/refresh/`, { refresh: token })
      .pipe(map((userToken) => {
        tokens._accessToken = userToken.data.accessToken;
        localStorage.setItem('tokens', JSON.stringify(tokens));
        return tokens;
      }),
        catchError((err) => {
          return throwError(err);
        }));
  }

  validateLogin(username: string, password: string): Observable<any> {
    const params: AuthDetails = {
      username: username,
      password: password,
      first_name: '',
      last_name: ''
    };

    return this.http.post<any>(`${environment.baseUrl}/auth/login/`, params)
      .pipe(
        map((result) => {
          const tokens = {
            accessToken: result.data.jwtToken,
            refreshToken: result.data.refreshToken,
          };

          this._tokens = tokens;
          this.storageService.setItem('tokens', JSON.stringify(tokens));
          return of(true);
        }),
        catchError((errorRes) => {
          let errorMessage = {
            authError: 'An unknown error occurred!'
          };
          if (!errorRes.error || !errorRes.error.data.message) {
            return of(errorMessage);
          }
          errorMessage.authError = errorRes.error.data.message;
          return of(errorMessage);
        }));
  }

  getToken() {
    const tokens = this.storageService.getItem('tokens');
    return tokens ? JSON.parse(tokens) : this._tokens;
  }

  logout(): Observable<any> {
    this.storageService.clear();
    return of(true);
  }

  resetPassword(username: string) {
    return this.http.post<any>(`${environment.baseUrl}/auth/forgot-password/`, { username: username })
  }

  register(username: string, password: string, firstName: string, lastName: string) {
    const params: AuthDetails = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    };

    return this.http.post<any>(`${environment.baseUrl}/auth/register/`, params)
      .pipe(
        map((result) => {
          return of(true);
        }),
        catchError((errorRes) => {
          let errorMessage = {
            authError: 'An unknown error occurred!'
          };
          if (!errorRes.error || !errorRes.error.data.message) {
            return of(errorMessage);
          }
          errorMessage.authError = errorRes.error.data.message;
          return of(errorMessage);
        }));
  }

  approveOrDisapproveCalendarEvent(eventId: string, flag: number) {
    const body = {
      approve: flag
    }
    return this.http.put(`${environment.baseUrl}/event/approve-or-disapprove-event/${eventId}`, body)
  }
}
