import { each } from "jquery";
import * as _ from "lodash";
import lp from "../images/lp.png";
import paper from "../images/paper.jpeg";

export class Tile {
  constructor(src = paper, alt = "") {
    this.src = src;
    this.alt = alt;
  }

  // static createTile(src = paper, alt = "") {
  //   return {
  //     src: src,
  //     alt: alt,
  //   };
  // }
}

export class Topster {
  constructor(row = 10, col = 10, type = "grid") {
    this._type = type;
    this._row = row;
    this._col = col;
    this._tiles = row * col;
  }

  static create42(row = 6, col = 7, type = "top42") {
    // const eachTile = Tile.createTile();
    let row5 = _.fill(Array(5), new Tile());
    let row6 = _.fill(Array(6), new Tile());
    let row10 = _.fill(Array(10), new Tile());
    let rows = [];
    rows.push(row5);
    rows.push(row5);
    rows.push(row6);
    rows.push(row6);
    rows.push(row10);
    rows.push(row10);
    return _.cloneDeep(rows);
  }

  static createGrid(row = 10, col = 10, type = "grid") {
    // const eachTile = new Tile();
    const eachRow = _.fill(Array(col), { src: paper, alt: "" });
    let rows = _.fill(Array(row), eachRow);

    return _.cloneDeep(rows);
  }

  // static extractImgSrcs(rows, topsterType) {
  //   let imgSrcs = [];
  //   rows.forEach((row) => {
  //     row.forEach((tile) => imgSrcs.push(tile.src));
  //   });

  //   let imgGrid = [];
  //   if (topsterType === "top42") {
  //     imgGrid.push(imgSrcs.slice(0, 5));
  //     imgGrid.push(imgSrcs.slice(5, 10));
  //     imgGrid.push(imgSrcs.slice(10, 16));
  //     imgGrid.push(imgSrcs.slice(16, 22));
  //     imgGrid.push(imgSrcs.slice(22, 32));
  //     imgGrid.push(imgSrcs.slice(32, 42));
  //     return imgGrid;
  //   } else {
  //     for (let i = 0; i < topster.tiles; i += topster.col) {
  //       imgGrid.push(imgSrcs.slice(i, i + topster.col));
  //     }
  //     return _.cloneDeep(imgGrid);
  //   }
  // }

  // static extractImgAlts(rows, topsterType) {
  //   let imgAlts = [];
  //   rows.forEach((row) => {
  //     row.forEach((tile) => imgAlts.push(tile.alt));
  //   });

  //   let imgGrid = [];
  //   if (topsterType === "top42") {
  //     imgGrid.push(imgAlts.slice(0, 5));
  //     imgGrid.push(imgAlts.slice(5, 10));
  //     imgGrid.push(imgAlts.slice(10, 16));
  //     imgGrid.push(imgAlts.slice(16, 22));
  //     imgGrid.push(imgAlts.slice(22, 32));
  //     imgGrid.push(imgAlts.slice(32, 42));
  //     return imgGrid;
  //   } else {
  //     for (let i = 0; i < topster.tiles; i += topster.col) {
  //       imgGrid.push(imgAlts.slice(i, i + topster.col));
  //     }
  //     return _.cloneDeep(imgGrid);
  //   }
  // }
}
