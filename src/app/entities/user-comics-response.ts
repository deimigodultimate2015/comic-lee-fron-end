export class UserComicResponse {

    title: string;
    comicId: number;
    coverId: number;

    constructor(title: string, comicId: number, coverId: number) {
        this.title = title;
        this.comicId = comicId;
        this.coverId = coverId;
    }
}
