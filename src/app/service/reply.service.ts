import { ReplyResponse } from './../entities/reply.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MyConstant } from '../constant/MyConstant';
import { ReplyRequest } from '../entities/reply.request';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  constructor(private http: HttpClient ) { }

  saveReply(reply: ReplyRequest): Observable<ReplyResponse> {
    return this.http.post<ReplyResponse>(MyConstant.API_ENDPOINT + 'reply', reply);
  }
}
