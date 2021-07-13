import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { tap } from 'rxjs/operators';

import { ServiceUtils } from '../serviceUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false;
  public user: User;
  public token: string;

  private serverUrl = environment.serverUrl;

  constructor(private http: HttpClient, private router: Router, private serviceUtils: ServiceUtils) { }

  public login(email: string, password: string) {
    const url = `${this.serverUrl}` + '/auth/token/';

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    return this.http.post(url, formData)
      .pipe(
        tap((res: User) => {
          this.token = res.token;
          console.log(res);
          
          if (this.token.length) {
            this.isLoggedIn = true;
            this.user = res;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
          } else {
            this.isLoggedIn = false;
            localStorage.setItem('token', '');
          }
          return this.token;
        })
      );
  }

  public logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    this.router.navigate(['/auth/login']);
  }

  public getUser() {
    let user = localStorage.getItem('user');
    if (user && user != '') return this.user = JSON.parse(user);
    else return null;
  }

  public resetPassword(email) {
    const url = `${this.serverUrl}` + '/auth/password-reset/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, { email }, httpOptions)
      .pipe(
        tap((res: any) => {
          return res
        })
      );
  }

  public verifyResetToken(token) {
    const url = `${this.serverUrl}` + '/auth/password-reset/validate_token/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, { token }, httpOptions)
      .pipe(
        tap((res: any) => {
          return res
        })
      );
  }

  public resetConfirmPassword(password, token) {
    const url = `${this.serverUrl}` + '/auth/password-reset/confirm/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, { password, token }, httpOptions)
      .pipe(
        tap((res: any) => {
          return res
        })
      );
  }

  public updatePassword(old_password, new_password, email) {
    const url = `${this.serverUrl}` + 'auth/set/password/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.post(url, { old_password, new_password, email }, httpOptions)
      .pipe(
        tap((res: any) => {
          return res
        })
      );
  }
}
