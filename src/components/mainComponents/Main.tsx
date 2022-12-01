import React, { useState, useEffect, useRef, useContext } from "react";
import * as _ from "lodash";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import SearchPanel from "./SearchPanel";
import TopsterBoard from "./TopsterBoard/TopsterBoard";
import "./mainComponentStyles/Main.css";
import SettingsAccordion from "./SettingAccordion";
import SaveImgButton from "./SaveImgButton";
import HelpAccordion from "./HelpAccordion";
import {
  changeBlankCellsToBackgroundColor,
  changeBlankCellsToDefaultBackground,
  getGridContainerWidth,
} from "../../models/topsterUtils";
import ReactGA from "react-ga";
import { GAID } from "../../constants/credentials";
import { LocalPersistencyManager, SessionPersistencyManager } from "../../services/PersistencyManager";
import { TopsterContext } from "../../App";
import { observer } from "mobx-react-lite";


const  MobileTopsterMaker = observer((): JSX.Element => {
  const topster = useContext(TopsterContext);
  const [selectedCell, setSelectedCell] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showTitles, setShowAlbumTitle] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);
  const [isRoundedBorder, setIsRoundedBorder] = useState(true);
  const pictureContainer = useRef(document.getElementById("picture-container"));
  const gridContainer = useRef(document.getElementById("grid-container"));

  useEffect(() => {
    ReactGA.initialize(GAID);
    ReactGA.pageview(window.location.pathname);

    pictureContainer.current = document.getElementById(
      "picture-container"
    )! as HTMLElement;
    gridContainer.current = document.getElementById(
      "grid-container"
    )! as HTMLElement;

    setShowAlbumTitle(
      LocalPersistencyManager.retrieve("showTitles") === "false" ? false : true
    );
    setShowPreferences(
      LocalPersistencyManager.retrieve("showPreferences") === "false" ? false : true
    );
    setIsRoundedBorder(
      LocalPersistencyManager.retrieve("isRoundedBorder") === "false" ? false : true
    );
  }, [selectedCell]);

  const preSave = (): void => {
    setProcessingSave(true);
  };

  const postSave = (): void => {
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
    const browser = window.navigator.userAgent;

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
    if (showPreferences) {
      setShowPreferences(false);
    } else {
      setShowPreferences(true);
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
      {/* 설정 */}
      <SettingsAccordion
        showPreferences={showPreferences}
        showTitles={showTitles}
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
      {/* 도움말 */}
      <HelpAccordion />
      <hr />
      {/* 탑스터 */}
      <TopsterBoard showTitles={showTitles}/>
      {/* 검색창  */}
      <SearchPanel
        onClickCancel={() => setShowSearch(false)}
        showSearch={showSearch}
        handleClickAlbum={handleClickAlbum}
      />
      {/* 저장 버튼 */}
      <SaveImgButton save={handleSave} />
    </main>
  );
});

export default MobileTopsterMaker;
