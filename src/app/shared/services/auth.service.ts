import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../models/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth_Base_Url: string = environment.AuthBaseUrl
  islading$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  Login(userDetails: ILogin): Observable<any> {
    let Login_Url = `${this.Auth_Base_Url}/api/auth/login`
    return this.http.post<any>(Login_Url, userDetails)
  }
  SignUp(userDetails: ISingIn): Observable<any> {
    let SignUp_Url = `${this.Auth_Base_Url}/api/auth/register`
    return this.http.post<any>(SignUp_Url, userDetails)
  }
  SaveToken(Token: string) {
    localStorage.setItem('token', Token)
  }
  SaveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole')
  }
  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }
}
