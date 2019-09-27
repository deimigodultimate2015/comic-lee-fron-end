import { UploaderComic } from './uploader-comic';
import { Tag } from './tag';

export class ComicResponse {

    id: number;
    title: string;
    artist: string;
    tags: Tag[];
    uploader: UploaderComic;
    date: string;
    comicFavorites: number;

    constructor() {
        this.uploader = new UploaderComic();
    }
}
