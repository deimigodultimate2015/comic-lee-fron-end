import { MyConstant } from './../constant/MyConstant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  constructor(private http: HttpClient) {

  }

  getUploaderInfo(username: string): Observable<object> {
    return this.http.get(`${MyConstant.API_ENDPOINT}uploader/${username}`);
  }
}
