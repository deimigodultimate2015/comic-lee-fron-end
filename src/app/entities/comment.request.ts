export class CommentRequest {
    comicId: number;
    content: string;

    constructor() {
        this.comicId = 0;
        this.content = '';
    }
}