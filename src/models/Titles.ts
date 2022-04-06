import { Titles } from "./types";

const createTitles = (row: number, col: number): Titles => {
  return {
    _row: row,
    _col: col,
    titleList: new Array(row).fill(new Array(col).fill("")),
  };
};

export default createTitles;
