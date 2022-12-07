import { observable } from 'mobx';
import { makeObservable } from 'mobx';

export class Album {
    title: string;
    artist: string;
    art: string;

    constructor(title: string = "", artist: string = "", art: string = "") {
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
    });}
}