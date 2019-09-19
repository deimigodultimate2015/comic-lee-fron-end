import { MyConstant } from './../constant/MyConstant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient ) { }

  getAllTags(): Observable<any> {
    return this.http.get(MyConstant.API_ENDPOINT + 'tags');
  }
}
