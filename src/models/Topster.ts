import { Cell, Grid } from "./modelTypes";
import { Album } from "./Album";

const createCell = (src: string = "", alt: string = ""): Cell => {
  return {
    src: src,
    alt: alt,
  };
};

const createGridRow = (col: number): Array<Cell> => {
  let row: Array<Cell> = [];
  for (let j: number = 0; j < col; j++) {
    row.push(createCell());
  }
  return row;
};

const createSquareGrid = (row: number, col: number): Grid => {
  let grid: Grid = [];
  for (let i: number = 0; i < row; i++) {
    grid.push(createGridRow(col));
  }
  return grid;
};

class Topster {
  #albums: Array<Album>;
  #backgroundColor: string = "#000";
  #backgroundImg: string = "";
  #type: string;
  #fontFamily: string = "default";
  #textColor: string = "#fff";
  #fontSize: string = "10px";
  #order: boolean = true;
  #rows: number = 7;
  #cols: number = 6;
  #gridGap: number = 1;

  constructor(albums: Array<Album> = [], backgroundColor: string = "#000", type: string = "42") {
    this.#albums = albums;
    this.#backgroundColor = backgroundColor;
    this.#type = "42";
  }
  getAlbums() { return this.#albums; }
  replaceAlbums(albums: Array<Album>) { this.#albums = albums; }
  getAlbumsIn(start: number, end: number) { return this.#albums.slice(start, end); }
  getAlbumAt(idx: number) { return this.#albums.at(idx); }
  replaceAlbumAt(idx: number, album: Album) { this.#albums[idx] = album; }
  getAlbumTitles() { return this.#albums.map(album => album.title); }
  getAlbumArts() { return this.#albums.map(album => album.art); }
  getAlbumArtists() { return this.#albums.map(album => album.artist); }

  get backgroundColor(): string { return this.backgroundColor; }
  set backgroundColor(backgroundColor: string) { this.#backgroundColor = backgroundColor; }

  get type() { return this.#type; }
  set type(type: string) { this.#type = type; }

  get fontFamily() { return this.#fontFamily; }
  set fontFamily(fontFamily: string) { this.#fontFamily = fontFamily; }

  get textColor() { return this.#textColor; }
  set textColor(textColor: string) { this.#textColor = textColor; }

  get fontSize() { return this.#fontSize; }
  set fontSize(fontSize: string) { this.#fontSize = fontSize; }

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

export { createSquareGrid, createCell, Topster };
