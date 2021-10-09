import * as _ from "lodash";

export default class Titles {
  constructor(row, col) {
    this._row = row;
    this._col = col;
    this.titleList = new Array(this._row).fill(new Array(this._col).fill(""));
    console.log(this.titleList);
  }
}
