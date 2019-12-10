import { ReplyResponse } from './reply.response';
export class CommentResponse {
    content: string;
    createdDate: string;
    id: number;
    point: number;
    state: number;
    replies: ReplyResponse[];

    isReply = false;
    constructor() {
        this.content = '';
        this.createdDate = '';
        this.id = 0;
        this.point = 0;
        this.state = 0;
    }
}