import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListUploaderComponent } from './comic-list-uploader.component';

describe('ComicListUploaderComponent', () => {
  let component: ComicListUploaderComponent;
  let fixture: ComponentFixture<ComicListUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicListUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicListUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
