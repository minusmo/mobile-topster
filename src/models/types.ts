type Cell = {
  src: Number;
  alt: String;
};

type Grid = Cell[Cell[]];

type Titles = {
  _row: Number;
  _col: Number;
  titleList: Array<Array<Tile>>;
};

export { Cell, Grid, Titles };
