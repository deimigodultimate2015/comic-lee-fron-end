import { MyConstant } from './../constant/MyConstant';
import { JwtResponse } from './../entities/jwt-response';
import { AuthInfoLogin } from './../entities/auth-info-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userLogin(loginInfo: AuthInfoLogin): Observable<object> {
    return this.http.post<JwtResponse>(`${MyConstant.API_ENDPOINT}auth/user/login`, loginInfo);
  }

  uploaderLogin(loginInfo: AuthInfoLogin): Observable<object> {
    return this.http.post<JwtResponse>(`${MyConstant.API_ENDPOINT}auth/admin/login`, loginInfo);
  }

}
