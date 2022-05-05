import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import SearchWindow from "./SearchWindow";
import TitleList from "./TitleList";
import TopsterTemplate from "./TopsterTemplate";
import { createSquareGrid } from "../../models/Topster";
import "./mainComponentStyles/Main.css";
import ReactGA from "react-ga";
import SettingsAccordion from "./SettingAccordion";
import SaveImgButton from "./SaveImgButton";
import HelpAccordion from "./HelpAccordion";
import Spinner from "../subComponents/Spinner";
import {
  changeBlankCellsToBackgroundColor,
  changeBlankCellsToDefaultBackground,
  getGridContainerWidth,
} from "../../models/topsterUtils";
import { GAID } from "./constants/credentials";

function MobileTopsterMaker() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [topster, setTopster] = useState(createSquareGrid(10, 10));
  const [type, setType] = useState("grid");
  const [selectedCell, setSelectedCell] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [showSearch, setShowSearch] = useState(false);
  const [showAlbumTitle, setShowAlbumTitle] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);
  const [isRoundedBorder, setIsRoundedBorder] = useState(true);
  const pictureContainer = useRef(document.getElementById("picture-container"));
  const gridContainer = useRef(document.getElementById("grid-container"));

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
    localStorage.setItem("isRoundedBorder", String(isRoundedBorder));
  };

  useEffect(() => {
    ReactGA.initialize(GAID);
    ReactGA.pageview(window.location.pathname);

    pictureContainer.current = document.getElementById(
      "picture-container"
    )! as HTMLElement;
    gridContainer.current = document.getElementById(
      "grid-container"
    )! as HTMLElement;

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
      setIsRoundedBorder(
        localStorage.getItem("isRoundedBorder") === "false" ? false : true
      );
    }
  }, []);

  useEffect(() => {
    saveTopster();
  }, [
    topster,
    backgroundColor,
    showSearch,
    showOptions,
    showAlbumTitle,
    rows,
    columns,
  ]);

  const preSave = (): void => {
    setProcessingSave(true);
    changeBlankCellsToBackgroundColor(gridContainer.current, backgroundColor);
  };

  const postSave = (): void => {
    changeBlankCellsToDefaultBackground(gridContainer.current);
    setProcessingSave(false);
  };

  type optionsType = {
    pixelRatio?: number;
    canvasWidth?: number;
    canvasHeight?: number;
  };

  const createSaveOptions = (
    pictureContainer: HTMLElement | null
  ): optionsType => {
    if (!pictureContainer) {
      return {};
    }
    let options = {
      pixelRatio: 1,
      canvasWidth: getGridContainerWidth(gridContainer.current) * 3,
      canvasHeight: pictureContainer.clientHeight * 3,
    };
    return options;
  };

  const handleSave = async (imgType: string): Promise<void> => {
    preSave();
    const userAgent = window.navigator.userAgent!;
    if (!pictureContainer.current) {
      return;
    }

    const options = createSaveOptions(pictureContainer.current);

    try {
      const blob: Blob | null = await htmlToImage.toBlob(
        pictureContainer.current,
        options
      );
      if (blob) {
        saveAs(blob, `topster-mobile.${imgType}`);
      }
    } catch (error) {
      alert("저장에 실패했습니다.");
      console.warn(error);
    } finally {
      postSave();
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
      let selectedRow: number = Number.parseInt(selectedCell.split("-")[0]);
      let selectedCol: number = Number.parseInt(selectedCell.split("-")[1]);

      let updatedTopster = _.cloneDeep(topster);
      updatedTopster[selectedRow][selectedCol].src = targetImg.src;
      updatedTopster[selectedRow][selectedCol].alt = targetImg.alt;

      setTopster(updatedTopster);

      setSelectedCell("");
      setShowSearch(false);
      e.preventDefault();
    }
  };

  const toggleBorder = (): void => {
    setIsRoundedBorder(!isRoundedBorder);
  };

  const topsterContainerClassname = (
    isRoundedBorder: boolean,
    topsterType: string
  ): string => {
    let classList: string[] = [];
    if (isRoundedBorder) {
      classList.push("border-rounded");
    }
    if (topsterType === "top42") {
      classList.push("top42-container");
    }
    return classList.join(" ");
  };

  return (
    <main id="main">
      <SettingsAccordion
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
        isRoundedBorder={isRoundedBorder}
        toggleBorder={toggleBorder}
      />
      <HelpAccordion />
      <hr />
      <div id="picture-container">
        <div
          id="topster-container"
          className={topsterContainerClassname(isRoundedBorder, type)}
          style={{
            backgroundColor: backgroundColor,
          }}
        >
          {/* 탑스터  */}
          <TopsterTemplate
            rows={rows}
            cols={columns}
            topsterType={type}
            topster={topster}
            backgroundColor={backgroundColor}
            handleClickGridcell={handleClickGridcell}
            isRoundedBorder={isRoundedBorder}
            currentWidth={getGridContainerWidth(gridContainer.current)}
          />
        </div>
        {/* 앨범 타이틀 목록 */}
        <TitleList
          rows={rows}
          cols={columns}
          showAlbumTitle={showAlbumTitle}
          topsterRows={topster}
          backgroundColor={backgroundColor}
          isRoundedBorder={isRoundedBorder}
        />
      </div>
      {/* 검색창  */}
      <SearchWindow
        onClickCancel={() => setShowSearch(false)}
        showSearch={showSearch}
        handleClickAlbum={handleClickAlbum}
      />
      <SaveImgButton save={handleSave} />
      <Spinner classname={processingSave ? "show" : ""} />
    </main>
  );
}

export default MobileTopsterMaker;
