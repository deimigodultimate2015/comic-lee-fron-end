export class ViewRequest {
    uuid: string;
    comicId: number;

    constructor(uuid: string, comicId: number) {
        this.uuid = uuid;
        this.comicId = comicId;
    }
}
