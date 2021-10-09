import { each } from "jquery";
import * as _ from "lodash";
import paper from "../images/paper.jpeg";

export class Tile {
  constructor(src = paper, alt = "") {
    this.src = src;
    this.alt = alt;
  }
}

export class Topster {
  constructor(row = 10, col = 10, type = "grid") {
    this._type = type;
    this._row = row;
    this._col = col;
    this._tiles = row * col;
  }

  static create42(row = 6, col = 7, type = "top42") {
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
}
