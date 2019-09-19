import { Tag } from './tag';

export class ComicResponse {

    id: number;
    title: string;
    artist: string;
    tags: Tag[];
    uploader: {
        id: number,
        display: string
    };
    date: string;

}
