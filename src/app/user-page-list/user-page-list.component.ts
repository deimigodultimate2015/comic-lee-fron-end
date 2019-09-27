import { MyConstant } from './../constant/MyConstant';
import { PageService } from './../service/page.service';
import { CustomPage } from './../entities/custom-page';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page-list',
  templateUrl: './user-page-list.component.html',
  styleUrls: ['./user-page-list.component.css']
})
export class UserPageListComponent implements OnInit {

  pages: CustomPage[] = [];

  constructor(private route: ActivatedRoute,
              private pageService: PageService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadPages();
  }

  loadPages() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageService.getAllPages(+id).subscribe(data => {
      this.pages = data;
    }, error => {
    });
  }

  getSanitizer(url: string) {
    url = MyConstant.API_ENDPOINT + 'page/' + url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
