import { UserComicListComponent } from './user-comic-list/user-comic-list.component';
import { TokenStorageService } from './auth/token-storage.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ComicLee-Front-End';
  info: any;

  constructor(private router: Router, public token: TokenStorageService) {
    this.updateInfo();
  }

  updateInfo() {
    this.info = {
      username: this.token.getUsername(),
      token: this.token.getToken(),
      authorities: this.token.getAuthorities()
    };
  }

  toComicsManager() {
    this.router.navigate(['admin/comics']);
  }

  logout() {
    this.token.signOut();
    this.updateInfo();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  toHomePage() {
    this.router.navigate(['/comics']);
  }
}
