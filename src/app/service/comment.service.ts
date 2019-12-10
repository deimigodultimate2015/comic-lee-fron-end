import { InteractionRequest } from './../entities/interaction.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MyConstant } from '../constant/MyConstant';
import { CommentRequest } from './../entities/comment.request';
import { CommentResponse } from './../entities/comment.response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient ) { }

  saveComment(comment: CommentRequest): Observable<any> {
    return this.http.post(MyConstant.API_ENDPOINT + 'comment', comment);
  }

  loadComment(comicId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(`${MyConstant.API_ENDPOINT}comments/${comicId}`);
  }

  saveInteraction(interaction: InteractionRequest): Observable<any> {
    return this.http.put<any>(MyConstant.API_ENDPOINT + 'comment/interaction', interaction);
  }
}
