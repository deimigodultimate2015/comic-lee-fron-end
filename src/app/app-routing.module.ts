import { ComicListUploaderComponent } from './comic-list-uploader/comic-list-uploader.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/comic', pathMatch: 'full'},
  {path: 'comic', component: ComicListUploaderComponent},
  {path: 'comic/detail/:id', component: ComicDetailComponent},
  {path: '**', component: ComicListUploaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
