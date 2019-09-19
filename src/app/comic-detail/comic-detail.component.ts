import { PageService } from './../service/page.service';
import { ComicResponse } from './../entities/comic-response';
import { ComicService } from './../service/comic.service';
import { CustomPage } from './../entities/custom-page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {

  pages: CustomPage[] = [];
  currentImageToUpload: File;

  uploadForm: FormData = new FormData();
  currentComic: ComicResponse;

  pagesChanged = false;
  pagesUpdated = false;

  constructor(private route: ActivatedRoute, private comicService: ComicService,
              private pageService: PageService, private sanitizer: DomSanitizer,
              private router: Router) {

  }

  getSanitizer(url: string) {
    url = 'http://localhost:8080/api/page/' + url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getSanitizerForCover() {
    let url = 'http://localhost:8080/api/page/';
    if (this.pages.length > 0) {
      url = url + this.pages[0].id;
    } else {
    }

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.comicService.getComic(+id).subscribe((data: ComicResponse) => {
      console.log(data);
      this.currentComic = data;
      this.getAllPages();
    });

  }

  updatePageIndex() {
    const idsToUpdate: number[] = [];
    this.pages.forEach(page => {
      idsToUpdate.push(page.id);
    });


    this.pageService.updatePages(this.currentComic.id, idsToUpdate).subscribe(data => {
      console.log(data);
    }, error => {
      this.pagesChanged = false;
      this.pagesUpdated = true;
    });
  }

  removeFromPages(position: number) {
    this.pages.splice(position, 1);
    this.pagesChanged = true;
  }

  uploadPage() {
    this.uploadForm = new FormData();
    console.log(this.currentImageToUpload.name);
    this.uploadForm.append('file', this.currentImageToUpload);
    this.uploadForm.append('comicId', this.currentComic.id + '');
    this.uploadForm.append('index', this.pages.length + '');

    this.pageService.uploadPage(this.uploadForm).subscribe(data => {
      console.log('Upload complete');
      this.getAllPages();
    }, error => {
      this.getAllPages();
    });

  }

  navigateToMainList() {
    this.router.navigate(['comic']);
  }

  public getAllPages() {
    this.pageService.getAllPages(this.currentComic.id).subscribe(data => {
      this.pages = data;
    }, error => {
      console.log(error);
    });
  }

  onFileSelected(event) {
    console.log('file changed');
    event.target.files = null;
    this.currentImageToUpload = event.target.files[0] as File;
    this.uploadPage();
  }


  movePageTo(currentIndex: number, destinationIndex: number) {
    if (this.pages.length > 1) {

      if (destinationIndex) {
        if (destinationIndex < 0) {destinationIndex = 0; }
        if (destinationIndex > this.pages.length - 1) {destinationIndex = this.pages.length - 1; }

        console.log('Current index is: ' + currentIndex + 'and destination index is: ' + destinationIndex);
        const temp = this.pages[destinationIndex] ;
        this.pages[destinationIndex] = this.pages[currentIndex];
        this.pages[currentIndex] = temp;

        this.pagesChanged = true;
      }
    }

  }

}
