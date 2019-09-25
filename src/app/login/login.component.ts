import { JwtResponse } from './../entities/jwt-response';
import { TokenStorageService } from './../auth/token-storage.service';
import { AuthInfoLogin } from './../entities/auth-info-login';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: AuthInfoLogin = new AuthInfoLogin('', '');

  constructor(private authService: AuthService, private tokenStorate: TokenStorageService,
              private router: Router) { }

  loginFailed = false;
  loginFailedMess = '';


  ngOnInit() {
    this.checkRole();
  }


  userSubmit() {
    this.loginFieldRequired();
    this.authService.userLogin(this.loginInfo).subscribe((data: JwtResponse) => {
      this.saveJwtResponse(data);
      window.location.reload();
    }, error => {
      this.enableError('Wrong username or password');
    });
  }

  adminSubmit() {
    this.loginFieldRequired();
    this.authService.uploaderLogin(this.loginInfo).subscribe((data: JwtResponse) => {
      this.saveJwtResponse(data);
      window.location.reload();
    }, error => {
      this.enableError('Wrong username or password');
    });
  }

  enableError(mess: string) {
    this.loginFailedMess = mess;
    this.loginFailed = true;
  }

  loginFieldRequired() {
    if (this.loginInfo.username.length < 1 || this.loginInfo.password.length < 1) {
      this.enableError('Username and password is required');
    }
  }

  saveJwtResponse(jwt: JwtResponse) {
    this.tokenStorate.saveAuthorities(jwt.authorities);
    this.tokenStorate.saveToken(jwt.token);
    this.tokenStorate.saveUsername(jwt.username);
  }

  checkRole() {
    if (this.tokenStorate.getAuthorities()[0] === 'ROLE_UPLOADER') {
      this.router.navigate(['admin/comics']);
    } else if (this.tokenStorate.getAuthorities()[0] === 'ROLE_USER') {
      this.router.navigate(['comics']);
    }
  }
}
