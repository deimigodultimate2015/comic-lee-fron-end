export class SearchRequest {
    page: number;
    search: string;

    constructor() {
        this.page = 1;
        this.search = '';
    }
}
