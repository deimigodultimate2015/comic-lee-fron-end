import { UserComicResponse } from './../entities/user-comics-response';
import { ComicService } from './../service/comic.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-comic-list',
  templateUrl: './user-comic-list.component.html',
  styleUrls: ['./user-comic-list.component.css']
})
export class UserComicListComponent implements OnInit {

  constructor(private comicService: ComicService,
              private sanitizer: DomSanitizer,
              private router: Router) { }
  userComics: UserComicResponse[] = [];

  ngOnInit() {
    this.updateComicList();
  }

  updateComicList() {
    this.comicService.getUserComic().subscribe(data => {
      this.userComics = data;
    });
  }

  getSanitizer(url: string) {
    url = 'http://localhost:8080/api/page/' + url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  toDetailPage(id: number) {
    this.router.navigate(['comic/detail', id]);
  }


}
