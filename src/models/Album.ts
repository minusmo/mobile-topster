export class Album {
    title: string;
    artist: string;
    art: string;
    constructor(title: string = "", artist: string = "", art: string = "") {
        this.title = title;
        this.artist = artist;
        this.art = art;
    }
}