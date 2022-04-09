type Cell = {
  src: string;
  alt: String;
};

type Grid = Array<Array<Cell>>;

type Titles = {
  _row: Number;
  _col: Number;
  titleList: Array<Array<Tile>>;
};

export { Cell, Grid, Titles };
