import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import SearchPanel from "./SearchPanel/SearchPanel";
import TopsterBoard from "./TopsterBoard/TopsterBoard";
import Preferences from "./Preferences/Preferences";
import SaveButton from "./SaveButton/SaveButton";
import HelpMessages from "./HelpMessages/HelpMessages";
import { LocalPersistency } from "../../services/Persistency";
import useImgSave from "./SaveButton/useImgSave";

const savedTitlesState = JSON.parse(LocalPersistency.retrieve("showAlbumTitles")) ? true : false;

const TopsterMaker = observer((): JSX.Element => {
  const [showAlbumTitles, setShowAlbumTitle] = useState(savedTitlesState);
  const capturedArea = useRef<HTMLElement | null>(null);
  const {updateCapturedArea, captureArea} = useImgSave(capturedArea.current);

  useEffect(() => {
    updateCapturedArea(capturedArea.current!);

    return () => {
      LocalPersistency.save("showAlbumTitles", JSON.stringify(showAlbumTitles));
    };
  }, []);

  return (
    <div id="topster-maker">
      {/* 탑스터 */}
      <TopsterBoard
        showAlbumTitles={showAlbumTitles}
        capturedAreaRef={capturedArea}
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
      <SaveButton imgSaveHandler={captureArea} />
    </div>
  );
});

export default TopsterMaker;
