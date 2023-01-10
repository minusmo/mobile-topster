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

const TopsterMaker = observer((): JSX.Element => {
  const [showAlbumTitles, setShowAlbumTitle] = useState(savedTitlesState);
  const [processingSave, setProcessingSave] = useState(false);
  const screenshotArea = useRef<HTMLElement | null>(null);

  useEffect(() => {
    screenshotArea.current = document.querySelector("#screenshot-area") as HTMLElement;

    return () => {
      LocalPersistency.save("showAlbumTitles", JSON.stringify(showAlbumTitles));
    };
  }, []);

  const {handleSave} = useImgSave();

  return (
    <div id="topster-maker">
      {/* 탑스터 */}
      <TopsterBoard 
        showAlbumTitles={showAlbumTitles} 
      />
      {/* 검색창  */}
      <SearchPanel />
      {/* 설정 */}
      <Preferences
        showAlbumTitles={showAlbumTitles}
        setShowAlbumTitle={setShowAlbumTitle}
      />
      {/* 도움말 */}
      <HelpMessages />
      {/* 저장 버튼 */}
      <SaveButton imgSaveHandler={handleSave} />
    </div>
  );
});

export default TopsterMaker;
