import React, { useState, useEffect, useRef, useContext } from "react";
import * as _ from "lodash";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import SearchPanel from "./SearchPanel/SearchPanel";
import TopsterBoard from "./TopsterBoard/TopsterBoard";
import "./mainComponentStyles/Main.css";
import Preferences from "../mainComponents/Preferences";
import SaveImgButton from "./SaveImgButton";
import HelpMessages from "../mainComponents/HelpMessages";
import {
  changeBlankCellsToBackgroundColor,
  changeBlankCellsToDefaultBackground,
  getGridContainerWidth,
} from "../../models/topsterUtils";
import ReactGA from "react-ga";
import { GAID } from "../../constants/credentials";
import { LocalPersistencyManager, SessionPersistencyManager } from "../../services/PersistencyManager";
import { observer } from "mobx-react-lite";

const Main = observer((): JSX.Element => {
  const [selectedCell, setSelectedCell] = useState("");
  const [showAlbumTitles, setShowAlbumTitle] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);
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
      LocalPersistencyManager.retrieve("showAlbumTitles") === "false" ? false : true
    );
    setShowPreferences(
      LocalPersistencyManager.retrieve("showPreferences") === "false" ? false : true
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

  const handleShowPreferences = (): void => {
    if (showPreferences) {
      setShowPreferences(false);
    } else {
      setShowPreferences(true);
    }
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
      <Preferences
        showPreferences={showPreferences}
        showAlbumTitles={showAlbumTitles}
        setShowAlbumTitle={setShowAlbumTitle}
      />
      {/* 도움말 */}
      <HelpMessages />
      <hr />
      {/* 탑스터 */}
      <TopsterBoard showAlbumTitles={showAlbumTitles}/>
      {/* 검색창  */}
      <SearchPanel
        showUp={showSearchPanel}
        onClickCancel={() => setShowSearchPanel(false)}
      />
      {/* 저장 버튼 */}
      <SaveImgButton save={handleSave} />
    </main>
  );
});

export default Main;
