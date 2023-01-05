import { makeObservable, observable, action } from "mobx";
import { Album } from "./Album";
import { FontStyle } from './FontStyle';

type ITopster = {
  albums: Album[];
  backgroundColor: string;
  backgroundImg: string;
  type: TopsterType;
  fontStyle: FontStyle;
  ordered: boolean;
  rows: number;
  cols: number;
  gridGap: number;
  borderRoundness: boolean;
}

export enum TopsterType {
    Top42,
    Grid,
}

const defaultAlbums: Album[] = observable(Array(100).fill(0).map((val) => new Album()));
const defaultColor: string = "#000000";
const defaultType: TopsterType = TopsterType.Top42;

export class Topster {
  id: string = crypto.randomUUID();
  albums: Album[];
  backgroundColor: string = "#000";
  backgroundImg: string = "";
  type: TopsterType;
  fontStyle: FontStyle = new FontStyle();
  ordered: boolean = true;
  rows: number = 10;
  cols: number = 10;
  gridGap: number = 1;
  borderRoundness: boolean = false;

  constructor(albums: Album[] = defaultAlbums, backgroundColor: string = defaultColor, type: TopsterType = TopsterType.Grid) {
    makeObservable(this, {
      albums: observable,
      backgroundColor: observable,
      backgroundImg: observable,
      type: observable,
      fontStyle: observable,
      ordered: observable,
      rows: observable,
      cols: observable,
      gridGap: observable,
      borderRoundness: observable,
      fromJson: action,
      replaceAlbums: action,
      replaceAlbumAt: action,
    });
    this.albums = albums; 
    this.backgroundColor = backgroundColor;
    this.type = type;
  }

  
  replaceAlbums(albums: Album[]) { this.albums = albums; }
  getAlbumsBetween(start: number = 0, end: number) { return this.albums.slice(start, end); }
  getAlbumAt(idx: number) { return this.albums.at(idx); }
  replaceAlbumAt(idx: number, album: Album) { this.albums[idx] = album; }
  getAlbumTitles() { return this.albums.map(album => album.title); }
  getAlbumArts() { return this.albums.map(album => album.art); }
  getAlbumArtists() { return this.albums.map(album => album.artist); }
  getAlbumsAsATable() {
    const table: Array<Album[]> = [];
    for (let i=0;i<this.rows;i++) {
      table.push(this.albums.slice(i,i+this.rows));
    }
    return table;
  }

  toString(): string { 
    return JSON.stringify({
    albums: this.albums.map(album => album.toString()),
    backgroundColor: this.backgroundColor,
    backgroundImg: this.backgroundImg,
    type: this.type,
    fontStyle: this.fontStyle.toString(),
    ordered: this.ordered,
    rows: this.rows,
    cols: this.cols,
    gridGap: this.gridGap,
  })}

  fromJson(topsterObject: ITopster) {
    this.albums = topsterObject.albums;
    this.backgroundColor = topsterObject.backgroundColor;
    this.backgroundImg = topsterObject.backgroundImg;
    this.fontStyle = topsterObject.fontStyle;
    this.type = topsterObject.type;
    this.rows = topsterObject.rows;
    this.cols = topsterObject.cols;
    this.gridGap = topsterObject.gridGap;
    this.borderRoundness = topsterObject.borderRoundness;
  }

}