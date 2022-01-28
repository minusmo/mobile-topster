import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as _ from "lodash";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import "./App.css";
import paper from "./images/paper.jpeg";
import { username, password } from "./credentials";
import TopsterGrid from "./components/Grid";
import SearchWindow from "./components/SearchWindow";
import TitleList from "./components/TitleList";
import ControlButtons from "./components/ControlButtons";
import TopsterTemplate from "./components/TopsterTemplate";
import Manual from "./components/Manual";
import Options from "./components/Options";
import { Topster, Tile } from "./models/Topster";
import Titles from "./models/Titles";

function MobileTopsterMaker() {
  const topsterRef = useRef(null);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [topster, setTopster] = useState(() =>
    Topster.createGrid(10, 10, "grid")
  );
  const [type, setType] = useState("grid");
  const [selectedCell, setSelectedCell] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [showSearch, setShowSearch] = useState(false);
  const [showAlbumTitle, setShowAlbumTitle] = useState(false);
  const [showOptions, setShowOptions] = useState("none");

  const updateTopster = (row, col, type) => {
    // const oldTopster = _.cloneDeep(topsterRef.current);
    // const newTopster = _.cloneDeep(
    //   type === "grid"
    //     ? Topster.createGrid(row, col, type)
    //     : Topster.create42(6, 7, "top42")
    // );
    // console.log("oldTopster: \n", oldTopster, "newTopster: \n", newTopster);
    // saveTopster();
    // console.log(newTopster);
    setType(type);
    setRows(row);
    setColumns(col);
    updateTopsterRef(row, col, type);
    // fetchTopster(newTopster);
  };

  const updateTopsterRef = (row, col, type) => {
    if (topsterRef.current) {
      topsterRef.current._row = row;
      topsterRef.current._col = col;
      topsterRef.current._type = type;
      topsterRef.current._tiles = row * col;
    }
  };

  // const resetTopster = () => {
  //   setRows(10);
  //   setColumns(10);
  //   // 앨범 이미지를 새로운 탑스터로 옮김
  //   let newTopster = new Topster(10, 10, "grid");
  //   setTopster(newTopster);
  // };

  const saveTopster = () => {
    // const imgSrcs = Topster.extractImgSrcs(oldTopster.rows, newTopster);
    // const imgAlts = Topster.extractImgAlts(oldTopster.rows, newTopster);
    // localStorage.setItem("imgSrcs", JSON.stringify(imgSrcs));
    // localStorage.setItem("imgAlts", JSON.stringify(imgAlts));
    localStorage.setItem("topsterRef", JSON.stringify(topsterRef.current));
    localStorage.setItem("topster", JSON.stringify(topster));
    localStorage.setItem("rows", rows.toString());
    localStorage.setItem("columns", columns.toString());
    localStorage.setItem("type", type);
    localStorage.setItem("showSearch", showSearch);
    localStorage.setItem("showAlbumTitle", showAlbumTitle);
    localStorage.setItem("showOptions", showOptions);
    localStorage.setItem("backgroundColor", backgroundColor);
    localStorage.setItem("selectedCell", selectedCell);
  };

  const fetchTopster = (newTopster) => {
    if (localStorage.imgSrcs && localStorage.imgAlts) {
      const imgSrcs = JSON.parse(localStorage.getItem("imgSrcs"));
      const imgAlts = JSON.parse(localStorage.getItem("imgAlts"));
      // let updatedTopster = _.assign({}, topsterRef.current);
      newTopster.rows.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
          tile.src = imgSrcs[rowIndex][colIndex];
          tile.alt = imgAlts[rowIndex][colIndex];
        });
      });
      setTopster(newTopster.rows);
      topsterRef.current = newTopster;
      // setTitles(topsterRef.current.titleList);
    }
  };

  useEffect(() => {
    const savedTopster = localStorage.getItem("topster");
    if (savedTopster) {
      topsterRef.current = JSON.parse(localStorage.getItem("topsterRef"));
      setTopster(JSON.parse(savedTopster));
      setRows(Number.parseInt(localStorage.getItem("rows")));
      setColumns(Number.parseInt(localStorage.getItem("columns")));
      setType(localStorage.getItem("type"));
      setShowSearch(Boolean(localStorage.getItem("showSearch")));
      setShowAlbumTitle(Boolean(localStorage.getItem("showAlbumTitle")));
      setShowOptions(Boolean(localStorage.getItem("showOptions")));
      setBackgroundColor(localStorage.getItem("backgroundColor"));
    } else {
      topsterRef.current = new Topster(10, 10, "grid");
    }
  }, []);

  useEffect(() => {
    saveTopster();
  }, [topster, rows, columns, backgroundColor]);

  const getExtenedHeight = (gridtemplaterow) => {
    const heights = gridtemplaterow.split(" ");
    const viewportWidth = window.innerWidth;
    const viewportRatios = _.map(heights, (height) => {
      return (viewportWidth * Number.parseFloat(height.slice(5, 9))) / 100;
    });
    const tentimes = _.map(
      viewportRatios,
      (viewportRatio) => 10 * viewportRatio + "px"
    );
    return tentimes.join(" ");
  };

  const handleSave = () => {
    const mainCon = document.getElementById("mainContainer");
    const gridCon = document.getElementById("gridContainer");
    const titleList = document.getElementById("titleList");
    const gridCellClassName = type === "top42" ? "gridCell42" : "gridCell";
    const gridCells = document.getElementsByClassName(gridCellClassName);

    // const gridStyle = gridCon.style.gridTemplateRows;
    // if (curTopsterStyle === "42") {
    //   const extendedStyle = getExtenedHeight(gridStyle);
    //   gridCon.style.gridTemplateRows = extendedStyle;
    // }
    const {
      gridTemplateRows,
      gridTemplateColumns,
      padding: gridconPadding,
      width: gridconWidth,
    } = gridCon.style;
    gridCon.style.gridTemplateRows = `repeat(${rows}, calc(10*95vw/${rows}))`;
    gridCon.style.gridTemplateColumns = `repeat(${columns}, calc(10*95vw/${rows}))`;
    gridCon.style.padding = `calc(10*${gridconPadding})`;
    gridCon.style.width = "950vw";

    // const gridConWidth = gridCon.offsetWidth;
    // gridCon.style.width = gridCon.offsetWidth * 10 + "px";
    // gridCon.style.height =
    //   curTopsterStyle === "42"
    //     ? gridCon.offsetHeight * 9.5 + "px"
    //     : gridCon.offsetHeight * 10 + "px";
    // gridCon.style.height = gridCon.offsetWidth * 10 + "px";
    // gridCon.style.padding = "25vw";
    Array.from(gridCells).forEach((cell) => (cell.style.padding = "10vw"));

    const { padding: titlelistPadding, fontSize } = titleList.style;
    const titlelistWidth = titleList.offsetWidth;
    titleList.style.width = `950vw`;
    titleList.style.padding = `calc(10*${gridconPadding})`;
    titleList.style.fontSize = "8em";

    const options = {
      pixelRatio: 1,
    };

    htmlToImage
      .toBlob(mainCon, options)
      .then((blob) => {
        saveAs(blob, "topster-mobile.png");
        gridCon.style.width = "95vw";
        // gridCon.style.height = "95vw";
        gridCon.style.padding = gridconPadding;
        gridCon.style.gridTemplateRows = gridTemplateRows;
        gridCon.style.gridTemplateColumns = gridTemplateColumns;
        gridCon.style.width = gridconWidth;

        titleList.style.width = ``;
        titleList.style.fontSize = ".8em";
        titleList.style.padding = "2.5vw";

        Array.from(gridCells).forEach((cell) => (cell.style.padding = "1vw"));
      })
      .catch((err) => console.warn(err));
  };

  const handleShowOptions = () => {
    if (showOptions === "") {
      setShowOptions("none");
    } else {
      setShowOptions("");
    }
  };

  const handleDoubleClick = (e) => {
    const img = e.target;
    img.src = paper;
    img.alt = "";
  };

  const handleClickGridcell = (e) => {
    e.preventDefault();
    if (showSearch === false) {
      setShowSearch(true);
      setSelectedCell(e.target.id);
      // console.log(e.target.id);
    }
  };

  const handleClickAlbum = (e) => {
    let selectedRow = Number.parseInt(selectedCell.split("-")[0]);
    let selectedCol = Number.parseInt(selectedCell.split("-")[1]);

    let updatedTopster = _.cloneDeep(topster);

    console.log(topster);
    console.log(updatedTopster);
    console.log(selectedRow, selectedCol);

    let updatedRow = [...updatedTopster[selectedRow]];
    updatedRow[selectedCol] = new Tile(e.target.src, e.target.alt);
    updatedTopster[selectedRow] = updatedRow;

    setTopster(updatedTopster);

    setSelectedCell(null);
    setShowSearch(false);
    e.preventDefault();
  };

  return (
    <div className="App">
      <ControlButtons
        handleShowOptions={handleShowOptions}
        handleSave={handleSave}
      />

      <div id="mainContainer">
        {/* 탑스터  */}
        <TopsterTemplate
          rows={rows}
          cols={columns}
          topsterType={type}
          topster={topster}
          backgroundColor={backgroundColor}
          handleClickGridcell={handleClickGridcell}
        />
        {/* 앨범 타이틀 목록 */}
        <TitleList
          rows={rows}
          cols={columns}
          showAlbumTitle={showAlbumTitle}
          topsterRows={topster}
          backgroundColor={backgroundColor}
        />
      </div>

      {/* 옵션 설정 */}
      <Options
        showOptions={showOptions}
        showAlbumTitle={showAlbumTitle}
        setShowAlbumTitle={setShowAlbumTitle}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        rows={rows}
        setRows={setRows}
        columns={columns}
        setColumns={setColumns}
        saveTopster={saveTopster}
        setTopster={setTopster}
        fetchTopster={fetchTopster}
        updateTopster={updateTopster}
      />

      {/* 검색창  */}
      <SearchWindow
        onClickCancel={() => setShowSearch(false)}
        showSearch={showSearch}
        handleClickAlbum={handleClickAlbum}
      />

      {/* 사용설명 */}
      <Manual />
    </div>
  );
}

export default MobileTopsterMaker;
