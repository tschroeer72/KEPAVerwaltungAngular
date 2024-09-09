import { Inject, Injectable, Optional } from '@angular/core';
import { AUTH_ENABLED } from '../app.tokens';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { ILogin } from '../core/interfaces/ilogin';

const CURRENT_USER = 'currentUser';
//const TOKEN = '';
const BASE_URL = 'http://localhost:5003/api/';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  TOKEN:any = '';

  constructor(@Optional() @Inject(AUTH_ENABLED) @Optional() private authEnabled = false, private httpClient: HttpClient) {
  }

  login(name: string, pw: string) {
    // const [user] = this.USERS.filter(user_ => user_.name === name);
    // if (user && user.password === password) {
    //   localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    //   return true;
    // }
    // return false;
    const login: ILogin = {
      username: name,
      password: pw
    };
    //console.log(login);
    //console.log('JSON: ' + JSON.stringify(login));
    return this.httpClient.post<{ token: string }>(BASE_URL + 'Login', JSON.stringify(login));
    
    
    // .subscribe(
    //   (tk) => {
    //     localStorage.setItem(CURRENT_USER, login.username);
    //     localStorage.setItem('token', tk.token)

    //   }
    // ); //tk => console.log(tk.token)
    //console.log(this.TOKEN);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem(CURRENT_USER);
  }

  isLoggedIn() {
    return !this.authEnabled || localStorage.getItem(CURRENT_USER) != null;
  }

  getUser() {
    const userString = localStorage.getItem(CURRENT_USER);
    if (userString) {
      return JSON.parse(userString);
    }
  }
}
