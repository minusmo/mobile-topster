export type Cell = {
  src: string;
  alt: String;
};

export type Grid = Array<Array<Cell>>;

export type Titles = {
  _row: Number;
  _col: Number;
  titleList: Array<Array<Cell>>;
};
