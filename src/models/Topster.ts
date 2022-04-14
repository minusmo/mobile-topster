import paper from "../assets/images/paper.jpeg";
import { Cell, Grid } from "./modelTypes";

const createCell = (src: string = paper, alt: string = ""): Cell => {
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

export { createSquareGrid, createCell };
