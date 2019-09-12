import { Tag } from './../entities/tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comic-list-uploader',
  templateUrl: './comic-list-uploader.component.html',
  styleUrls: ['./comic-list-uploader.component.css']
})
export class ComicListUploaderComponent implements OnInit {

  tagsToUpload: Tag[] = [];
  tagsToSelect: Tag[] = [];

  currentTagToDecide: Tag = this.tagsToSelect[0];

  constructor() { }

  ngOnInit() {
    this.tagsToSelect.push(new Tag(1, 'Action'));
    this.tagsToSelect.push(new Tag(2, 'Comedy'));
    this.tagsToSelect.push(new Tag(3, 'Adventure'));
    this.tagsToSelect.push(new Tag(4, 'Drama'));
    this.tagsToSelect.push(new Tag(5, 'Horror'));
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  addTag() {
    if (this.currentTagToDecide) {
      this.addTagDeep2();
    } else {
    }
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
    console.log(this.tagsToUpload);
  }

  removeTag(tag: Tag) {
    if (this.tagsToUpload.length < 1) {
    } else {
      const index = this.tagsToUpload.indexOf(tag, 0);
      this.tagsToUpload.splice(index, 1);
    }
  }

}
