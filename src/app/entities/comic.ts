import { Tag } from './tag';
import { Identifiers } from '@angular/compiler';

export class Comic {

    uploader: number;
    id: number;
    title: string;
    artist: string;
    tags: Tag[];

}
