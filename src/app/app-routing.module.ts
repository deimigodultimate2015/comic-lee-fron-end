import { UserComicListComponent } from './user-comic-list/user-comic-list.component';
import { ComicListUploaderComponent } from './comic-list-uploader/comic-list-uploader.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageListComponent } from './user-page-list/user-page-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/comics', pathMatch: 'full'},
  {path: 'admin/comics', component: ComicListUploaderComponent},
  {path: 'comics', component: UserComicListComponent},
  {path: 'comic/detail/:id', component: ComicDetailComponent},
  {path: 'comic/read/:id', component: UserPageListComponent},
  {path: '**', component: UserComicListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
