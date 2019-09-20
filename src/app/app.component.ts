import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ComicLee-Front-End';

  constructor(private router: Router) {
  }

  toHomePage() {
    this.router.navigate(['/comics']);
  }
}
