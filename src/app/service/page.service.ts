import { MyConstant } from './../constant/MyConstant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  uploadPage(file: FormData): Observable<any> {
    return this.http.post(`${MyConstant.API_ENDPOINT}page`, file);
  }

  updatePages(comicIdd: number, list: number[]): Observable<any> {
    return this.http.put(`${MyConstant.API_ENDPOINT}pages/${comicIdd}`, list);
  }

  getAllPages(id: number): Observable<any> {
    return this.http.get(`${MyConstant.API_ENDPOINT}pages/${id}`);
  }
}
