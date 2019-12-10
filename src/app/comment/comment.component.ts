import { InteractionRequest } from './../entities/interaction.request';
import { ReplyService } from './../service/reply.service';
import { ReplyResponse } from './../entities/reply.response';
import { ReplyRequest } from './../entities/reply.request';
import { CommentResponse } from './../entities/comment.response';
import { CommentService } from './../service/comment.service';
import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommentRequest } from '../entities/comment.request';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comicId: number;

  commentRequest: CommentRequest = new CommentRequest();
  commentResponse: CommentResponse[] = [] ;
  replyRequest = new ReplyRequest();
  commentIdInReply = 0;

  constructor(
    private commentService: CommentService,
    private replyService: ReplyService
  ) { }

  ngOnInit() {
    this.loadComment();
  }

  loadComment() {
    this.commentService.loadComment(this.comicId).subscribe(data => {
      this.commentResponse = data;
      this.commentResponse.forEach(comment => {
        comment.createdDate = this.displayTimeAgo(comment.createdDate);
        comment.replies.forEach(reply => {
          reply.createdDate = this.displayTimeAgo(reply.createdDate);
        });
      });
      console.log(this.commentResponse);
    });
  }

  postComment() {
    this.commentRequest.comicId = this.comicId;
    this.commentService.saveComment(this.commentRequest).subscribe(data => {
      this.commentRequest.content = '';
      this.loadComment();
    });
  }

  postReply(comment: CommentResponse) {
    this.replyRequest.commentId = comment.id;
    this.replyService.saveReply(this.replyRequest).subscribe(data => {
      const replyToSave: ReplyResponse = data;
      replyToSave.createdDate = this.displayTimeAgo(replyToSave.createdDate);
      comment.replies.push(replyToSave);
      this.commentIdInReply = 0;
    });
  }

  postCommentInteraction(commentResponse: CommentResponse, state: number) {
    const interactionRequest: InteractionRequest = new InteractionRequest();
    interactionRequest.commentId = commentResponse.id;
    interactionRequest.state = state;
    this.commentService.saveInteraction(interactionRequest).subscribe(data => {
      commentResponse.state = state;
    }, error => {
      commentResponse.state = state;
      commentResponse.point += state;
    });
  }

  postReplyInteraction(replyResponse: ReplyResponse, state: number) {
    const interactionRequest: InteractionRequest = new InteractionRequest();
    interactionRequest.commentId = replyResponse.id;
    interactionRequest.state = state;
    this.commentService.saveInteraction(interactionRequest).subscribe(data => {
      replyResponse.state = state;
    }, error => {
      replyResponse.state = state;
      replyResponse.point += state;
    });
  }

  openReply(comment: CommentResponse) {
    this.replyRequest = new ReplyRequest();
    this.commentIdInReply = comment.id;
  }

  displayTimeAgo(createdDate: string) {
    const postedTimeAgo = Math.round(Math.abs((+new Date(createdDate).getTime()) - (+new Date().getTime())));
    console.log(postedTimeAgo);
    if (postedTimeAgo < 1000) {
      return 'Just now';
    } else if (postedTimeAgo > 1000 && postedTimeAgo < 1000 * 60) {
      return Math.floor(postedTimeAgo / 1000) + ' second ago';
    } else if (postedTimeAgo > 1000 * 60  && postedTimeAgo < 1000 * 60 * 60) {
      return Math.floor(postedTimeAgo / 1000 / 60) + ' minutes ago';
    } else if (postedTimeAgo > 1000 * 60 * 60 && postedTimeAgo < 1000 * 60 * 60 * 24) {
      return Math.floor(postedTimeAgo / 1000 / 60 / 60) + ' hours ago';
    } else if (postedTimeAgo > 1000 * 60 * 60 * 24 && postedTimeAgo < 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(postedTimeAgo / 1000 / 60 / 60 / 24) + ' days ago';
    } else if (postedTimeAgo > 1000 * 60 * 60 * 24 * 30  && postedTimeAgo < 1000 * 60 * 60 * 24 * 30 * 365) {
      return Math.floor(postedTimeAgo / 1000 / 60 / 60 / 24 / 30) + ' months ago';
    } else {
      return formatDate(createdDate, 'dd MMM yy', 'USA');
    }
  }
}
