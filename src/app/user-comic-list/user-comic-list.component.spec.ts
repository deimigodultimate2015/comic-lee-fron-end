import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComicListComponent } from './user-comic-list.component';

describe('UserComicListComponent', () => {
  let component: UserComicListComponent;
  let fixture: ComponentFixture<UserComicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
