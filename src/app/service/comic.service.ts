import { MyConstant } from './../constant/MyConstant';
import { ComicRequest } from './../entities/comic-request';
import { HttpClient } from '@angular/common/http';
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

  getAllComics(): Observable<any> {
    return this.http.get(MyConstant.API_ENDPOINT + 'comics');
  }

  getComic(id: number): Observable<object> {
    return this.http.get(MyConstant.API_ENDPOINT + 'comic/' + id);
  }

  updateComic(comicId: number, comicRequest: ComicRequest): Observable<object> {
    return this.http.put(MyConstant.API_ENDPOINT + 'comic/' + comicId, comicRequest);
  }

  getUserComic(): Observable<any> {
    return this.http.get(MyConstant.API_ENDPOINT + 'user/comics');
  }
}
