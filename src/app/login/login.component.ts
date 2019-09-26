import { JwtResponse } from './../entities/jwt-response';
import { TokenStorageService } from './../auth/token-storage.service';
import { AuthInfoLogin } from './../entities/auth-info-login';

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RegisterForm } from '../entities/register-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: RegisterForm = new RegisterForm('', '', '', '');
  isRegisterPhase = false;

  loginInfo: AuthInfoLogin = new AuthInfoLogin('', '');

  constructor(private authService: AuthService, private tokenStorate: TokenStorageService,
              private router: Router) { }

  loginFailed = false;
  loginFailedMess = '';

  registerFailed = false;
  registerFailedMess = '';

  registerSuccess = false;
  registerSuccessMess = '';

  ngOnInit() {
    this.checkRole();
  }

  userRegisterSubmit() {
    this.setRegisterDefault();
    this.registerFieldRequired();
    this.authService.userRegister(this.registerForm).subscribe(data => {
      this.enableSuccess('Register successful! Login now \(o_o)/');
    }, error => {
      this.enableRError(error.error.message);
    });
  }

  userSubmit() {
    this.registerFailed = false;
    this.loginFieldRequired();
    if (!this.registerFailed) {
      this.authService.userLogin(this.loginInfo).subscribe((data: JwtResponse) => {
        this.saveJwtResponse(data);
        window.location.reload();
      }, error => {
        this.enableError('Wrong username or password');
      });
    }
  }

  changeState() {
    this.isRegisterPhase = this.isRegisterPhase ? false : true;
  }

  adminSubmit() {
    this.registerFailed = false;
    this.loginFieldRequired();
    if (!this.registerFailed) {
      this.authService.uploaderLogin(this.loginInfo).subscribe((data: JwtResponse) => {
        this.saveJwtResponse(data);
        window.location.reload();
      }, error => {
        this.enableError('Wrong username or password');
      });
    }
  }

  enableError(mess: string) {
    this.loginFailedMess = mess;
    this.loginFailed = true;
  }

  enableRError(mess: string) {
    this.registerFailedMess = mess;
    this.registerFailed = true;
  }

  enableSuccess(mess: string) {
    this.registerSuccess = true;
    this.registerSuccessMess = mess;
  }

  setRegisterDefault() {
    this.registerFailed = false;
    this.registerSuccess = false;

    this.registerFailedMess = '';
    this.registerSuccessMess = '';
  }

  loginFieldRequired() {
    if (this.loginInfo.username.length < 1 || this.loginInfo.password.length < 1) {
      this.enableError('Username and password is required');
    }
  }

  registerFieldRequired() {
    if (this.registerForm.username.length < 1 || this.registerForm.password.length < 1 || this.registerForm.email.length < 1 ||
        this.registerForm.displayName.length < 1) {
      this.enableError('All fields are required');
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
