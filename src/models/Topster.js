import * as _ from 'lodash';
import smallblank from "./smallblank.png";

let initAlbums = {
    row1: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row2: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row3: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row4: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row5: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row6: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row7: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row8: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row9: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
    row10: {
      isHidden: false,
      cols: new Array(10).fill({
        src: smallblank,
        alt: "",
        hideCol: false,
      }),
    },
  };
  
  // console.log(initAlbums['row1']['cols'])
  // initAlbums['row1']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row2']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row3']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row4']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row5']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row6']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row7']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row8']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row9']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  // initAlbums['row10']['cols'].splice(9,1,{
  //   src: smallblank,
  //   alt: "",
  //   hideCol: true,
  // });
  
  // console.log(initAlbums);
  
  const initTitles = {
    row1: new Array(10).fill(""),
    row2: new Array(10).fill(""),
    row3: new Array(10).fill(""),
    row4: new Array(10).fill(""),
    row5: new Array(10).fill(""),
    row6: new Array(10).fill(""),
    row7: new Array(10).fill(""),
    row8: new Array(10).fill(""),
    row9: new Array(10).fill(""),
    row10: new Array(10).fill(""),
  };

  class TitleList {
      constructor(row) {
          this._titleList = _.times(row, _.stubArray().fill(""));
      }
  }

  class Tile {
      constructor(src, alt, hideCol) {
          this.src = src;
          this.alt = alt;
          this.hideCol = hideCol;
      }
  }

  class Topster {
      constructor(type) {
          this._type = type;
          if (type === "42") {
              this._create42();
          }
          else {
              const row, col = type.substring(0,2), type.substring(3);
              this._createGrid(row, col);
          }
      }

      _create42() {
        this._row = 6;
        this._col = null;
        this._tiles = 42;
        // this._r1 = _.stubArray().fill(new Tile(smallblank, "", false));
        // this._r2 = _.stubArray().fill(new Tile(smallblank, "", false));
        // this._r3 = _.stubArray().fill(new Tile(smallblank, "", false));
        // this._r4 = _.stubArray().fill(new Tile(smallblank, "", false));
        // this._r5 = _.stubArray().fill(new Tile(smallblank, "", false));
        // this._r6 = _.stubArray().fill(new Tile(smallblank, "", false));
        this._rows = _.times(6, _.stubArray().fill(new Tile(smallblank, "", false)));
        
      }

      _createGrid(row, col) {

      }
  }