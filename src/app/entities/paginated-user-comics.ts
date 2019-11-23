import { UserComicResponse } from './user-comics-response';
export class PaginatedUserComics {

    data: UserComicResponse[] = [];
    totalPage: number = 0;
    pageSize: number = 0;
    currentPage: number = 0;
    search: string = '';

}