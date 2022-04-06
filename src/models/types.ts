type Tile = {
  src: Number;
  alt: String;
};

type Titles = {
  _row: Number;
  _col: Number;
  titleList: Array<Array<Tile>>;
};

export { Tile, Titles };
