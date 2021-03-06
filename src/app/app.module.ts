import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicListUploaderComponent } from './comic-list-uploader/comic-list-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserComicListComponent } from './user-comic-list/user-comic-list.component';
import { UserPageListComponent } from './user-page-list/user-page-list.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    ComicListUploaderComponent,
    ComicDetailComponent,
    UserComicListComponent,
    UserPageListComponent,
    LoginComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
