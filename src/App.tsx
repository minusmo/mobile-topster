import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { Helmet } from "react-helmet";
import SearchWindow from "./components/subComponents/SearchWindow";
import TitleList from "./components/mainComponents/TitleList";
import ControlButtons from "./components/mainComponents/ControlButtons";
import TopsterTemplate from "./components/mainComponents/TopsterTemplate";
import Manual from "./components/mainComponents/Manual";
import Options from "./components/subComponents/Options";
import { createSquareGrid, createCell } from "./models/Topster";
import "./styles/App.css";
import ReactGA from "react-ga";
// import { GAID } from "./constants/credentials";

function MobileTopsterMaker() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [topster, setTopster] = useState(createSquareGrid(10,10));
  const [type, setType] = useState("grid");
  const [selectedCell, setSelectedCell] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [showSearch, setShowSearch] = useState(false);
  const [showAlbumTitle, setShowAlbumTitle] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const updateTopster = (row: number, col: number, type: string) => {
    setType(type);
    setRows(row);
    setColumns(col);
  };

  const saveTopster = () => {
    localStorage.setItem("topster", JSON.stringify(topster));
    localStorage.setItem("rows", rows.toString());
    localStorage.setItem("columns", columns.toString());
    localStorage.setItem("type", type);
    localStorage.setItem("showSearch", String(showSearch));
    localStorage.setItem("showAlbumTitle", String(showAlbumTitle));
    localStorage.setItem("showOptions", String(showOptions));
    localStorage.setItem("backgroundColor", backgroundColor);
    localStorage.setItem("selectedCell", selectedCell);
  };

  useEffect(() => {
    // ReactGA.initialize(GAID);
    // ReactGA.pageview(window.location.pathname);

    const savedTopster = localStorage.getItem("topster");
    if (savedTopster) {
      setTopster(JSON.parse(savedTopster));
      setRows(Number.parseInt(localStorage.getItem("rows")!));
      setColumns(Number.parseInt(localStorage.getItem("columns")!));
      setType(localStorage.getItem("type")!);
      setShowSearch(
        localStorage.getItem("showSearch") === "false" ? false : true
      );
      setShowAlbumTitle(
        localStorage.getItem("showAlbumTitle") === "false" ? false : true
      );
      setShowOptions(
        localStorage.getItem("showOptions") === "false" ? false : true
      );
      setBackgroundColor(localStorage.getItem("backgroundColor")!);
    }
  }, []);

  useEffect(() => {
    saveTopster();
  }, [
    topster,
    rows,
    columns,
    backgroundColor,
    showSearch,
    showOptions,
    showAlbumTitle,
  ]);

  const preSave = (gridconPadding: string, gridCells: HTMLCollectionOf<Element>, gridCon: HTMLElement, titleList: HTMLElement): void => {
    gridCon.style.gridTemplateRows = `repeat(${rows}, calc(10*95vw/${rows}))`;
    gridCon.style.gridTemplateColumns = `repeat(${columns}, calc(10*95vw/${rows}))`;
    gridCon.style.padding = `calc(10*${gridconPadding})`;
    gridCon.style.width = "950vw";

    Array.from(gridCells).forEach((cell) => {
      const gridCell = cell as HTMLElement;
      gridCell.style.padding = "10vw";
    });

    const { padding: titlelistPadding, fontSize } = titleList.style;
    const titlelistWidth = titleList.offsetWidth;
    titleList.style.width = `950vw`;
    titleList.style.padding = `calc(10*${gridconPadding})`;
    titleList.style.fontSize = "8em";
  };

  const postSave = (
    gridconPadding: string,
    gridTemplateRows: string,
    gridTemplateColumns: string,
    gridconWidth: string,
    gridCells: HTMLCollectionOf<Element>,
    gridCon: HTMLElement,
    titleList: HTMLElement
  ) => {
    gridCon.style.width = "95vw";

    gridCon.style.padding = gridconPadding;
    gridCon.style.gridTemplateRows = gridTemplateRows;
    gridCon.style.gridTemplateColumns = gridTemplateColumns;
    gridCon.style.width = gridconWidth;

    titleList.style.width = `95vw`;
    titleList.style.fontSize = ".8em";
    titleList.style.padding = "2.5vw";

    Array.from(gridCells).forEach((cell: Element) => {
      const gridCell = cell as HTMLElement;
      gridCell.style.padding = "1vw"
    });
  };

  const handleSave = () => {
    const userAgent = window.navigator.userAgent;
    const mainCon = document.getElementById("mainContainer")!;
    const gridCon = document.getElementById("gridContainer")!;
    const titleList = document.getElementById("titleList")!;
    const gridCellClassName = type === "top42" ? "gridCell42" : "gridCell";
    const gridCells = document.getElementsByClassName(gridCellClassName)!;

    const {
      gridTemplateRows,
      gridTemplateColumns,
      padding: gridconPadding,
      width: gridconWidth,
    } = gridCon.style;

    const options = {
      pixelRatio: 1,
    };

    if (userAgent.indexOf("Chrome") !== -1) {
      // if browser is chrome
      preSave(gridconPadding, gridCells, gridCon, titleList);

      htmlToImage
        .toBlob(mainCon, options)
        .then((blob: Blob | null) => {
          if (blob) {
            saveAs(blob, "topster-mobile.png");
            postSave(
              gridconPadding,
              gridTemplateRows,
              gridTemplateColumns,
              gridconWidth,
              gridCells,
              gridCon,
              titleList
            );
          }
        })
        .catch((err) => console.warn(err));
    } else if (userAgent.indexOf("Safari") !== -1) {
      // if browser is safari
      mainCon.style.width = "950vw";
      preSave(gridconPadding, gridCells, gridCon, titleList);
      htmlToImage
        .toBlob(mainCon, options)
        .then((blob: Blob | null) => {
          if (blob) {
            saveAs(blob, "topster-mobile.png");
            postSave(
              gridconPadding,
              gridTemplateRows,
              gridTemplateColumns,
              gridconWidth,
              gridCells,
              gridCon,
              titleList
            );
            mainCon.style.width = "95vw";
          }
        })
        .catch((err) => console.warn(err));
    }
  };

  const handleShowOptions = (): void => {
    if (showOptions) {
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  };

  const handleClickGridcell = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const gridCell = e.target as HTMLDivElement;
    if (showSearch === false) {
      setShowSearch(true);
      setSelectedCell(gridCell.id);
    }
  };

  const handleClickAlbum = (e: React.MouseEvent<HTMLImageElement>): void => {
    const targetImg = e.target as HTMLImageElement;
    if (selectedCell) {
      let selectedRow = Number.parseInt(selectedCell.split("-")[0]);
      let selectedCol = Number.parseInt(selectedCell.split("-")[1]);
  
      let updatedTopster = _.cloneDeep(topster);
  
      let updatedRow = [...updatedTopster[selectedRow]];
      updatedRow[selectedCol] = createCell(targetImg.src, targetImg.alt);
      updatedTopster[selectedRow] = updatedRow;
  
      setTopster(updatedTopster);
  
      setSelectedCell("");
      setShowSearch(false);
      e.preventDefault();
    }
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="mobile topster" />
        <title>Mobile-Topster</title>
      </Helmet>
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
