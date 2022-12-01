import { Album } from "./Album";
import { makeAutoObservable } from "mobx";
import { text } from "stream/consumers";

type FontStyleProps = {
  fontFamily: string;
  fontSize: string;
  textColor: string;
}

class FontStyle {
  #fontFamily: string;
  #fontSize: string;
  #textColor: string;
  constructor(fontFamily: string = "default", fontSize: string = "10px", textColor: string = "#fff") {
    this.#fontFamily = fontFamily;
    this.#fontSize = fontSize;
    this.#textColor = textColor;
  }
  
  get fontFamily(): string { return this.#fontFamily; }
  set fontFamily(fontFamily: string) { this.#fontFamily = fontFamily; }
  
  get fontSize(): string { return this.#fontSize; }
  set fontSize(fontSize: string) { this.#fontSize = fontSize; }
  
  get textColor(): string { return this.#textColor; }
  set textColor(textColor: string) { this.#textColor = textColor; }
  
  copyFrom(fontStyleProps: FontStyleProps): void {
    this.#fontFamily = fontStyleProps.fontFamily;
    this.#fontSize = fontStyleProps.fontSize;
    this.#textColor = fontStyleProps.textColor;
  }

  toString(): string { return JSON.stringify({
    fontFamily: this.#fontFamily, 
    fontSize: this.#fontSize, 
    textColor: this.#textColor
  });}
}

type TopsterProps = {
  albums: Array<Album>;
  backgroundColor: string;
  backgroundImg: string;
  type: string;
  fontStyle: FontStyle;
  order: boolean;
  rows: number;
  cols: number;
  gridGap: number;
}

class Topster {
  #albums: Array<Album>;
  #backgroundColor: string = "#000";
  #backgroundImg: string = "";
  #type: string;
  #fontStyle: FontStyle = new FontStyle();
  #order: boolean = true;
  #rows: number = 7;
  #cols: number = 6;
  #gridGap: number = 1;

  constructor(albums: Array<Album> = [], backgroundColor: string = "#000", type: string = "42") {
    makeAutoObservable(this);
    this.#albums = albums;
    this.#backgroundColor = backgroundColor;
    this.#type = "42";
  }

  toString(): string { return JSON.stringify({
    albums: this.#albums.map(album => album.toString()),
    backgroundColor: this.#backgroundColor,
    backgroundImg: this.#backgroundImg,
    type: this.#type,
    fontStyle: this.#fontStyle.toString(),
    order: this.#order,
    rows: this.#rows,
    cols: this.#cols,
    gridGap: this.#gridGap,
  })}

  copyFrom(topsterProps: TopsterProps): void {
    this.#albums = topsterProps.albums;
    this.#backgroundColor = topsterProps.backgroundColor;
    this.#backgroundImg = topsterProps.backgroundImg;
    this.#fontStyle = topsterProps.fontStyle;
    this.#type = topsterProps.type;
    this.#rows = topsterProps.rows;
    this.#cols = topsterProps.cols;
    this.#type = topsterProps.type;
    this.#gridGap = topsterProps.gridGap;
  }

  getAlbums() { return this.#albums; }
  replaceAlbums(albums: Array<Album>) { this.#albums = albums; }
  getAlbumsIn(start: number, end: number) { return this.#albums.slice(start, end); }
  getAlbumAt(idx: number) { return this.#albums.at(idx); }
  replaceAlbumAt(idx: number, album: Album) { this.#albums[idx] = album; }
  getAlbumTitles() { return this.#albums.map(album => album.title); }
  getAlbumArts() { return this.#albums.map(album => album.art); }
  getAlbumArtists() { return this.#albums.map(album => album.artist); }
  getAlbumsAsATable() {
    const table: Array<Array<Album>> = [];
    for (let i=0;i<this.#rows;i++) {
      table.push(this.#albums.slice(i,i+this.#rows));
    }
    return table;
  }

  get backgroundColor(): string { return this.backgroundColor; }
  set backgroundColor(backgroundColor: string) { this.#backgroundColor = backgroundColor; }

  get type() { return this.#type; }
  set type(type: string) { this.#type = type; }

  getFontStyle(): FontStyle {
    return this.#fontStyle;
  }

  setFontStyle(fontStyle: FontStyle): void {
    this.#fontStyle = fontStyle;
  }

  get fontFamily() { return this.#fontStyle.fontFamily; }
  set fontFamily(fontFamily: string) { this.#fontStyle.fontFamily = fontFamily; }

  get textColor() { return this.#fontStyle.textColor; }
  set textColor(textColor: string) { this.#fontStyle.textColor = textColor; }

  get fontSize() { return this.#fontStyle.fontSize; }
  set fontSize(fontSize: string) { this.#fontStyle.fontSize = fontSize; }

  isOrdered(): boolean { return this.#order; }
  toggleOrdered() { this.#order = !this.#order; }
  setOrdered(order: boolean) { this.#order = order; }

  get rows() { return this.#rows; }
  set rows(rows: number) { this.#rows = rows; }

  get cols() { return this.#cols; }
  set cols(cols: number) { this.#cols = cols; }

  get gridGap() { return this.#gridGap; }
  set gridGap(gridGap: number) { this.#gridGap = gridGap; }
}

export { Topster };
