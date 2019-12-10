import { SearchRequest } from './../entities/search.request';
import { ViewRequest } from './../entities/view-request';
import { MyConstant } from './../constant/MyConstant';
import { ComicRequest } from './../entities/comic-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicResponse } from '../entities/comic-response';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private http: HttpClient) { }

  storeComic(comicRequest: ComicRequest): Observable<object> {
    return this.http.post(MyConstant.API_ENDPOINT + 'comic', comicRequest);
  }

  getAllComics(uploaderId: number): Observable<any> {
    return this.http.get(MyConstant.API_ENDPOINT + 'comics/' + uploaderId);
  }

  getComic(id: number): Observable<object> {
    return this.http.get(MyConstant.API_ENDPOINT + 'comic/' + id);
  }

  updateComic(comicId: number, comicRequest: ComicRequest): Observable<object> {
    return this.http.put(MyConstant.API_ENDPOINT + 'comic/' + comicId, comicRequest);
  }

  getUserComic(searchRequest: SearchRequest): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', searchRequest.page + '');
    params = params.append('search', searchRequest.search);
    return this.http.get(MyConstant.API_ENDPOINT + 'user/comics', {params});
  }

  getUserFavoriteComics(username: string): Observable<any> {
    return this.http.get(`${MyConstant.API_ENDPOINT}user/favorite/comics/${username}`);
  }

  countView(viewRequest: ViewRequest): Observable<any> {
    return this.http.post(`${MyConstant.API_ENDPOINT}view`, viewRequest);
  }

  getViewsReport(comicId: number): Observable<object> {
    return this.http.get(`${MyConstant.API_ENDPOINT}views/${comicId}`);
  }
}
