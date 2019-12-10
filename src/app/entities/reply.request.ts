export class ReplyRequest {
    commentId: number;
    content: string;

    constructor() {
        this.commentId = 0;
        this.content = '';
    }
}
