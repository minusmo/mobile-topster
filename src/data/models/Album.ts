import { observable, makeObservable } from 'mobx';
import whitesquare from "../assets/images/white_square.jpg";

interface JsonAlbum {
    title: string;
    artist: string;
    art: string;
}

export class Album {
    title: string;
    artist: string;
    art: string;

    constructor(title: string = "", artist: string = "", art: string = whitesquare) {
        makeObservable(this, {
            title: observable,
            artist: observable,
            art: observable,
        });
        this.title = title;
        this.artist = artist;
        this.art = art;
    }

    toString(): string { 
        return JSON.stringify({
            title: this.title,
            artist: this.artist,
            art: this.art,
        });
    }

    fromJson(json: JsonAlbum) {
        this.title = json.title;
        this.artist = json.artist;
        this.art = json.art;
    }
}