import _ from "lodash";
import * as htmlToImage from "html-to-image";
import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { saveAs } from "file-saver";
import SearchPanel from "./SearchPanel/SearchPanel";
import TopsterBoard from "./TopsterBoard/TopsterBoard";
import Preferences from "./Preferences/Preferences";
import SaveButton from "./SaveButton";
import HelpMessages from "./HelpMessages/HelpMessages";
import { LocalPersistency } from "../../services/Persistency";

const savedTitlesState = JSON.parse(LocalPersistency.retrieve("showAlbumTitles")) ? true : false;
const savedPreferenceState = JSON.parse(LocalPersistency.retrieve("showPreferences")) ? true : false;

const TopsterMaker = observer((): JSX.Element => {
  const [showAlbumTitles, setShowAlbumTitle] = useState(savedTitlesState);
  const [showPreferences, setShowPreferences] = useState(savedPreferenceState);
  const [processingSave, setProcessingSave] = useState(false);
  const screenshotArea = useRef<HTMLElement | null>(null);

  useEffect(() => {
    screenshotArea.current = document.querySelector("#screenshot-area") as HTMLElement;

    return () => {
      LocalPersistency.save("showAlbumTitles", JSON.stringify(showAlbumTitles));
      LocalPersistency.save("showPreferences", JSON.stringify(showPreferences));
    };
  }, []);

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
    screenshotArea: HTMLElement | null
  ): optionsType => {
    if (!screenshotArea) {
      return {};
    }
    let options = {
      pixelRatio: 1,
    };
    return options;
  };

  const handleSave = async (imgType: string): Promise<void> => {
    preSave();
    const userAgent = window.navigator.userAgent!;
    if (!screenshotArea.current) {
      return;
    }

    const options = createSaveOptions(screenshotArea.current);
    const browser = window.navigator.userAgent;

    try {
      const blob: Blob | null = await htmlToImage.toBlob(
        screenshotArea.current,
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
    <div id="topster-maker">
      {/* 탑스터 */}
      <TopsterBoard 
        showAlbumTitles={showAlbumTitles} 
      />
      {/* 설정 */}
      <Preferences
        showAlbumTitles={showAlbumTitles}
        setShowAlbumTitle={setShowAlbumTitle}
      />
      {/* 도움말 */}
      <HelpMessages />
      {/* 검색창  */}
      <SearchPanel />
      {/* 저장 버튼 */}
      <SaveButton save={handleSave} />
    </div>
  );
});

export default TopsterMaker;
