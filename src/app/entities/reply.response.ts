export class ReplyResponse {
    content: string;
    createdDate: string;
    id: number;
    point: number;
    parentId: number;
    state: number;

    constructor() {
        this.content = '';
        this.createdDate = '';
        this.id = 0;
        this.point = 0;
        this.parentId = 0;
        this.state = 0;
    }
}