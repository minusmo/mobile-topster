import { makeObservable, observable, action } from "mobx";
import { Album } from "./Album";
import { FontStyle } from './FontStyle';

type TopsterProps = {
  albums: Array<Album>;
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

const defaultAlbums: Album[] = Array(100).fill(0).map((val) => new Album());
const defaultColor: string = "#000000";
const defaultType: TopsterType = TopsterType.Top42;

class Topster {
  albums: Array<Album>;
  backgroundColor: string = "#000";
  backgroundImg: string = "";
  type: TopsterType;
  fontStyle: FontStyle = new FontStyle();
  ordered: boolean = true;
  rows: number = 7;
  cols: number = 6;
  gridGap: number = 1;
  borderRoundness: boolean = false;

  constructor(albums: Array<Album> = defaultAlbums, backgroundColor: string = "#000", type: TopsterType = TopsterType.Top42) {
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
      copyFrom: action,
      replaceAlbums: action,
      replaceAlbumAt: action,
    });
    this.albums = albums; 
    this.backgroundColor = backgroundColor;
    this.type = type;
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

  // geAlbums() { return this.albums; }
  replaceAlbums(albums: Array<Album>) { this.albums = albums; }
  getAlbumsIn(start: number, end: number) { return this.albums.slice(start, end); }
  getAlbumAt(idx: number) { return this.albums.at(idx); }
  replaceAlbumAt(idx: number, album: Album) { this.albums[idx] = album; }
  getAlbumTitles() { return this.albums.map(album => album.title); }
  getAlbumArts() { return this.albums.map(album => album.art); }
  getAlbumArtists() { return this.albums.map(album => album.artist); }
  getAlbumsAsATable() {
    const table: Array<Array<Album>> = [];
    for (let i=0;i<this.rows;i++) {
      table.push(this.albums.slice(i,i+this.rows));
    }
    return table;
  }

  copyFrom(topsterProps: TopsterProps) {
    this.albums = topsterProps.albums;
    this.backgroundColor = topsterProps.backgroundColor;
    this.backgroundImg = topsterProps.backgroundImg;
    this.fontStyle = topsterProps.fontStyle;
    this.type = topsterProps.type;
    this.rows = topsterProps.rows;
    this.cols = topsterProps.cols;
    this.gridGap = topsterProps.gridGap;
    this.borderRoundness = topsterProps.borderRoundness;
  }

  // getbackgroundColor(): string { return this.backgroundColor; }
  // setbackgroundColor(backgroundColor: string) { this.backgroundColor = backgroundColor; }

  // get type() { return this.type; }
  // set type(type: string) { this.type = type; }

  // getFontStyle(): FontStyle {
  //   return this.fontStyle;
  // }

  // setFontStyle(fontStyle: FontStyle): void {
  //   this.fontStyle = fontStyle;
  // }

  // get fontFamily() { return this.fontStyle.fontFamily; }
  // set fontFamily(fontFamily: string) { this.fontStyle.fontFamily = fontFamily; }

  // get textColor() { return this.fontStyle.textColor; }
  // set textColor(textColor: string) { this.fontStyle.textColor = textColor; }

  // get fontSize() { return this.fontStyle.fontSize; }
  // set fontSize(fontSize: string) { this.fontStyle.fontSize = fontSize; }

  // isOrdered(): boolean { return this.ordered; }
  // toggleOrdered() { this.ordered = !this.ordered; }
  // setOrdered(ordered: boolean) { this.ordered = ordered; }

  // get rows() { return this.rows; }
  // set rows(rows: number) { this.rows = rows; }

  // get cols() { return this.cols; }
  // set cols(cols: number) { this.cols = cols; }

  // get gridGap() { return this.gridGap; }
  // set gridGap(gridGap: number) { this.gridGap = gridGap; }

  // get borderRoundness() { return this.borderRoundness; }
  // set borderRoundness(borderRoundness: boolean) { this.borderRoundness = borderRoundness; }
}

export { Topster };
