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
  @ViewChild(UserComicListComponent, {static: false}) userList;

  title = 'ComicLee-Front-End';
  info: any;

  constructor(private router: Router, private token: TokenStorageService) {
    this.info = {
      username: this.token.getUsername(),
      token: this.token.getToken(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.info);
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  loadFavorites() {
    this.userList.updateComicListFavorite();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  toHomePage() {
    this.router.navigate(['/comics']);
  }
}
