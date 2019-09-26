import { MyConstant } from './../constant/MyConstant';
import { FavoriteRequest } from './../entities/favorite-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkFavoriteState(favRequest: FavoriteRequest): Observable<any> {
    return this.http.post<boolean>(`${MyConstant.API_ENDPOINT}favorite/state`, favRequest);
  }

  favorite(favRequest: FavoriteRequest): Observable<object> {
    return this.http.post(`${MyConstant.API_ENDPOINT}favorite`, favRequest);
  }
}
