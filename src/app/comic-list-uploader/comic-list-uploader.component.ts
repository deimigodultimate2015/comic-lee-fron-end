import { Uploader } from './../entities/uploader';
import { UploaderService } from './../service/uploader.service';
import { TokenStorageService } from './../auth/token-storage.service';
import { PageService } from './../service/page.service';
import { ComicResponse } from './../entities/comic-response';
import { ComicService } from './../service/comic.service';
import { ComicRequest } from './../entities/comic-request';
import { TagService } from './../service/tag.service';
import { Tag } from './../entities/tag';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list-uploader',
  templateUrl: './comic-list-uploader.component.html',
  styleUrls: ['./comic-list-uploader.component.css']
})
export class ComicListUploaderComponent implements OnInit, OnDestroy {

  listComics: ComicResponse[] ;

  isEdit = false;
  currentIdToUpdate: number;

  uploadClicked = false;
  uploadState = false;
  uploadMessage = '';

  tagSubcribe: Subscription;

  uploaderInfo: Uploader;

  tagsToUpload: Tag[] = [];
  tagsToSelect: Tag[] = [];

  comicRequest: ComicRequest = new ComicRequest();

  currentTagToDecide: Tag = this.tagsToSelect[0];

  constructor(private tagServe: TagService, private comicServe: ComicService,
              private router: Router, public token: TokenStorageService,
              private uploaderService: UploaderService) { }


  checkRole() {
    if (this.token.getAuthorities()[0] !== 'ROLE_UPLOADER') {
      this.router.navigate(['comics']);
    }
  }

  ngOnInit() {
    this.checkRole();
    this.uploaderInit();
    this.tagInit();
  }

  tagInit() {
    this.tagSubcribe = this.tagServe.getAllTags().subscribe(data => {
      this.tagsToSelect = data;
      this.currentTagToDecide = this.tagsToSelect[0];
    });
  }

  uploaderInit() {
    this.uploaderService.getUploaderInfo(this.token.getUsername()).subscribe((data: Uploader) => {
      this.uploaderInfo = data;
      this.updateComicsList();
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/comic/detail', id]);
  }

  updateComicsList() {
    this.comicServe.getAllComics(this.uploaderInfo.id).subscribe(data => {
      this.listComics = data;
    }, error => {
    });
  }

  addTag() {
    if (this.currentTagToDecide) {
      this.addTagDeep2();
    } else {
    }
  }

  openEdit(index: number) {
    this.clearUpload();

    this.comicRequest.uploaderId = this.listComics[index].uploader.id;
    this.comicRequest.title = this.listComics[index].title;
    this.comicRequest.artist = this.listComics[index].artist;
    this.tagsToUpload = this.listComics[index].tags;
    this.currentIdToUpdate = this.listComics[index].id;

    this.isEdit = true;
  }

  openAdd() {
    this.clearUpload();
    this.isEdit = false;
  }

  onUpdate() {
    this.comicRequest.tags = this.tagsToUpload;

    this.uploadClicked = true;


    this.comicServe.updateComic(this.currentIdToUpdate, this.comicRequest).subscribe(data => {
      this.uploadMessage = 'Comic store success fully';
      this.uploadState = true;
      this.updateComicsList();
    }, error => {
      this.uploadMessage = error.error.message;
      this.uploadState = false;
    });

    this.updateComicsList();
  }

  onSubmit() {

    this.comicRequest.uploaderId = this.uploaderInfo.id;

    this.comicRequest.tags = this.tagsToUpload;

    this.uploadClicked = true;

    this.comicServe.storeComic(this.comicRequest).subscribe(data => {
      this.uploadMessage = 'Comic store success fully';
      this.uploadState = true;
      this.updateComicsList();
    }, error => {
      this.uploadMessage = error.error.message;
      this.uploadState = false;
    });
  }

  addTagDeep2() {
    if (this.tagsToUpload.length === 0) {
      this.tagsToUpload.push(this.currentTagToDecide);
    } else {
      let isItExist = false;

      this.tagsToUpload.forEach(tag => {
        if (tag.id === this.currentTagToDecide.id) {
          isItExist = true;
          return;
        }
      });

      if (isItExist) {
        isItExist = false;
      } else {
        this.tagsToUpload.push(this.currentTagToDecide);
      }
    }
  }

  removeTag(tag: Tag) {
    if (this.tagsToUpload.length < 1) {
    } else {
      const index = this.tagsToUpload.indexOf(tag, 0);
      this.tagsToUpload.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
  }

  clearUpload() {
    this.currentIdToUpdate = 0;
    this.uploadClicked = false;
    this.tagsToUpload = [];
    this.comicRequest = new ComicRequest();
    this.uploadState = false;
  }

}
